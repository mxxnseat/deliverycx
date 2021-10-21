import axios from "axios";
import { parseOrganization, Organization } from "../helpers/iiko";
import * as model from "../db/models";
import { ICity } from "../db/models/api/City";
import { geoCode, IPosition } from "../helpers/geoCoder";
import { IOrganization as IApiOrganization } from "../db/models/api/Organization";
import { ICategory, IGroup, INomenclature, IOrganization, IProduct,IOrderCheckCreationResult, IStopList } from "../types/axiosResponses";
import { IProductSchema } from "db/models/api/Product";
import { createOrderType } from "helpers/createOrder";
import imageToBase64 from "image-to-base64";


class Iiko {
    private static token: string = '';
    private static _instance: Iiko;

    private organizations: Organization[] = [];

    private constructor() { }
    public async iikoMethodBuilder(fn: ()=>any){
        await this.getToken();

        const result = await fn();
        return result;
    }
    public static getInstance() {
        if (!Iiko._instance) {
            Iiko._instance = new Iiko();
        }
        return Iiko._instance;
    }

    public get token() {
        return Iiko.token;
    }
    private async getToken() {
        try {
            const tokenResponse = await axios.get<string>(`https://iiko.biz:9900/api/0/auth/access_token?user_id=${process.env.iiko_user}&user_secret=${process.env.iiko_password}`);

            Iiko.token = tokenResponse.data;
        } catch (e) {
            console.log(`Error with get token\n${e}`);
        }
    }
    private async getOrganizations() {
        try {
            console.log("starting get organizations");
            const organizationsResponse = await axios.get<IOrganization[]>(`https://iiko.biz:9900/api/0/organization/list?access_token=${Iiko.token}`);

            this.organizations = organizationsResponse.data.map(organization => {
                return parseOrganization(organization);
            });
        } catch (e) {
            console.log(`Error with get organizations\n${e}`);
        }
    }
    public async createOrder(orderBody: createOrderType){
        try{
            const {data: checkData} = await axios.post<IOrderCheckCreationResult>(
                `https://iiko.biz:9900/api/0/orders/checkCreate?access_token=${Iiko.token}`,
                orderBody
            )

            if(checkData.resultState !== 0){
                return {
                    status: 400,
                    message: checkData.problem
                }
            }
            const {data: createData} = await axios.post(
                `https://iiko.biz:9900/api/0/orders/add?access_token=${Iiko.token}`,
                orderBody
            )

            return {
                status: 200,
                message: createData
            }
            
        }catch(e: any){
            return {
                status: e.response.data.httpStatusCode,
                message: e.response.data.description
            }
        }
    }
    private async getAndSaveNomenclature() {
        try {
            for (let k in this.organizations) {
                const productsResponse = await axios.get<INomenclature>(`https://iiko.biz:9900/api/0/nomenclature/${this.organizations[k].id}?access_token=${Iiko.token}`);
                const organization = this.organizations[k];
                const nomenclature = {
                    products: productsResponse.data.products,
                    groups: productsResponse.data.groups,
                    categories: productsResponse.data.productCategories,
                    revision: productsResponse.data.revision
                }
                const city = await model.City.findOneAndUpdate({ name: organization.address.city as string }, {
                    $setOnInsert: {
                        name: organization.address.city as string
                    }
                }, { new: true, upsert: true });

                await Promise.all(nomenclature.categories.map(async (category) => {
                    await model.Category.findOneAndUpdate({ _id: category.id }, {
                        ...category,
                        _id: category.id
                    }, { upsert: true });
                }));

                await model.Group.deleteMany({organization: organization.id});
                await Promise.all(nomenclature.groups.map(async (group) => {
                    if(group.parentGroup){
                        await model.Group.findOneAndUpdate({ _id: group.id }, {
                            ...group,
                            image: group.images.length ? group.images[group.images.length - 1]?.imageUrl : '',
                            organization: organization.id,
                            _id: group.id
                        }, { upsert: true });
                    }
                }));

                const products = await model.Product.findOneAndUpdate({ organization: organization.id }, {
                    $setOnInsert: {
                        organization: organization.id
                    },
                    revision: nomenclature.revision,
                    $set: {
                        products: nomenclature.products.map((product) =>{

                            return {
                                ...product,
                                image: product.images.length ? product.images[product.images.length - 1]?.imageUrl : '',
                                category: product.productCategoryId,
                                group: product.parentGroup
                            }
                        })
                    }
                }, { new: true, upsert: true });

                const cord = await geoCode(organization.address.fulladdress);
                await model.Organization.findOneAndUpdate({ _id: organization.id }, {
                    $setOnInsert: {
                        _id: organization.id,
                        city: city._id,
                        street: organization.address.address as string,
                        longitude: cord?.longitude,
                        latitude: cord?.latitude,
                        products: products._id
                    },
                    $set: {
                        contacts: {
                            ...organization.contacts
                        }
                    }
                }, { new: true, upsert: true });
            }
        } catch (e) {
            console.log(`Error with get products\n${e}`);
        }
    }
    public async getStopLists(organizationId: string = ''){
        try{
            const organizations = await model.Organization.find({});
            organizations.forEach((organization: IApiOrganization)=>{
                console.log(`Starting get stopLists for organization: ${organization._id}`);

                axios.get<IStopList>(
                    `https://iiko.biz:9900/api/0/stopLists/getDeliveryStopList?access_token=${Iiko.token}&organization=${organization._id}`
                ).then(async ({data: {stopList}})=>{
                    const list = stopList.map(el=>{
                        return el.items;
                    });

                    await model.StopList.findOneAndUpdate({organization: organization._id}, {
                        $setOnInsert: {
                            organization: organization._id
                        },
                        $set: {
                            products: list
                        }
                    }, {upsert: true});

                    console.log(`End get stopLists for organization: ${organization._id}`);
                })
                .catch(e=>{
                    console.log(`Error in stop lists ${organization._id}\n${e}`);
                });

                
            })
            

            
        }catch(e: unknown){
            console.log(e);
            return [];
        }
    }
    public async pooling() {
        console.log("start pooling");

        await this.getToken();
        await this.getOrganizations();
        await this.getAndSaveNomenclature();


        console.log("end pooling");
    }
    
}

export default Iiko.getInstance();