import axios from "axios";
import { parseOrganization, Organization } from "../helpers/iiko";
import * as model from "../db/models";
import { ICity } from "../db/models/api/City";
import { geoCode, IPosition } from "../helpers/geoCoder";
import { IOrganization as IApiOrganization } from "../db/models/api/Organization";
import { ICategory, IGroup, INomenclature, IOrganization, IProduct } from "../types/axiosResponses";
import { IProductSchema } from "db/models/api/Product";


class Iiko {
    private static token: string = '';
    private static _instance: Iiko;

    private organizations: Organization[] = [];

    private constructor() { }

    public static getInstance() {
        if (!Iiko._instance) {
            Iiko._instance = new Iiko();
        }
        return Iiko._instance;
    }

    public get token() {
        return Iiko.token;
    }
    public async getToken() {
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
                const city = await model.City.findOneAndUpdate({name: organization.address.city as string}, {
                    $setOnInsert: {
                        name: organization.address.city as string
                    }
                }, {new: true, upsert: true});

                await Promise.all(nomenclature.categories.map(async (category)=>{
                    await model.Category.findOneAndUpdate({_id: category.id}, {
                        ...category,
                        _id: category.id
                    }, {upsert: true});
                }));

                await Promise.all(nomenclature.groups.map(async (group)=>{
                    await model.Group.findOneAndUpdate({_id: group.id}, {
                        ...group,
                        images: group.images[group.images.length-1].imageUrl,
                        _id: group.id
                    }, {upsert: true});
                }));


                const products: any = await model.Product.findOneAndUpdate({organization: organization.id}, {
                    $setOnInsert: {
                        organization: organization.id
                    },
                    revision: nomenclature.revision,
                    products: nomenclature.products.map(product=>({
                        ...product,
                        category: product.productCategoryId,
                        group: product.parentGroup
                    }))
                }, {new: true, upsert: true});

                const cord = await geoCode(organization.address.fulladdress);
                await model.Organization.findOneAndUpdate({_id: organization.id}, {
                    _id: organization.id,
                    city: city._id,
                    street: organization.address.address as string,
                    longitude: cord?.longitude,
                    latitude: cord?.latitude,
                    contacts: {
                       ...organization.contacts
                    },
                    products: products._id
                }, {new: true});
            }
        } catch (e) {
            console.log(`Error with get products\n${e}`);
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