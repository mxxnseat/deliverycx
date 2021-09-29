import axios from "axios";
import { parseOrganization, Organization } from "../helpers/iiko";
import * as model from "../db/models";
import { ICity } from "../db/models/api/City";
import { geoCode, IPosition } from "../helpers/geoCoder";
import {IOrganization as IApiOrganization} from "../db/models/api/Organization";
import { ICategory, IGroup, INomenclature, IOrganization, IProduct } from "../types/axiosResponses";


class Iiko {
    private static token: string = '';
    private static _instance: Iiko;

    private organizations: Organization[] = [];
    private nomenclature: any = {};
    private categories: ICategory[] = [];
    private groups: IGroup[] = [];

    private constructor(){}

    public static getInstance(){
        if(!Iiko._instance){
            Iiko._instance = new Iiko();
        }
        return Iiko._instance;
    }

    public get token(){
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

            const organizations = organizationsResponse.data.map(organization => {
                return parseOrganization(organization);
            });
            this.organizations = organizations;
        } catch (e) {
            console.log(`Error with get organizations\n${e}`);
        }
    }
    private async getNomenclature() {
        try {
            for (let k in this.organizations) {
                const productsResponse = await axios.get<INomenclature>(`https://iiko.biz:9900/api/0/nomenclature/${this.organizations[k].id}?access_token=${Iiko.token}`);
                this.nomenclature = {
                    [this.organizations[k].id]: [
                        ...productsResponse.data.products
                    ]
                }
                this.categories = productsResponse.data.productCategories;
                this.groups = productsResponse.data.groups;
            }
        } catch (e) {
            console.log(`Error with get products\n${e}`);
        }
    }
    private async save() {
        for (let k in this.organizations) {
            const organization = this.organizations[k];

            /*
                Сохраняем город если его нет
            */
            const cityResponseMongoose = await model.City.findOneAndUpdate(
                { name: organization.address.city as string },
                { $setOnInsert: { name: organization.address.city as string } },
                { upsert: true, new: true }
            );
            const cityId = cityResponseMongoose._id;

            const products = this.nomenclature[organization.id]; // товары\продукты

            /*
                Сохраняем продукты
            */
            for(let pk of products){
                const productResponseMongoose = await model.Product.findOneAndUpdate(
                    {_id: pk.id},
                    {
                        $setOnInsert: {
                            category: pk.productCategoryId,
                            group: pk.parentGroup,
                            _id: pk.id,
                            code: pk.code,
                            name: pk.name,
                            weight: pk.weight,
                            images: pk.images[pk.images.length-1],
                            isIncludedInMenu: pk.isIncludedInMenu,
                            order: pk.order,
                            price: pk.price,
                            additionalInfo: pk.additionalInfo,
                            description: pk.description,
                            measureUnit: pk.measureUnit,
                        },
                        $addToSet: {
                            "organizations": organization.id
                        }
                    },
                    { upsert: true, new: true }
                )
            }

            /*
                Сохраняем категории
            */
            for(let ck of this.categories){
                const categoryResponseMongoose = await model.Category.findOneAndUpdate(
                    {_id: ck.id},
                    {
                        $setOnInsert: {
                            _id: ck.id,
                            name: ck.name
                        }
                    },
                    { upsert: true, new: true }
                )
            }

            /*
                Сохраняем группы
            */
            for(let gk of this.groups){
                const categoryResponseMongoose = await model.Group.findOneAndUpdate(
                    {_id: gk.id},
                    {
                        $setOnInsert: {
                            _id: gk.id,
                            name: gk.name,
                            code: gk.code,
                            images: gk.images[gk.images.length-1],
                            order: gk.order,
                            isIncludedInMenu: gk.isIncludedInMenu                            
                        }
                    },
                    { upsert: true, new: true }
                )
            }

            /*
                Сохраняем организации с рефами на город
            */
            const cord = await geoCode(organization.address.fulladdress);
            if(cord !== null){
                const {latitude, longitude} = cord;

                const organizationResponseMongoose = await model.Organization.findOneAndUpdate(
                    { _id: organization.id },
                    {
                        $setOnInsert: {
                            cityId,
                            latitude,
                            longitude,
                            contacts: {
                                phone: organization.contacts.phone,
                                email: organization.contacts.email
                            },
                            _id: organization.id,
                            street: organization.address.address as string,
                        }
                    },
                    { upsert: true, new: true }
                );
            }
            
        }
    }
    public async pooling() {
        console.log("start pooling");

        await this.getToken();
        await this.getOrganizations();
        await this.getNomenclature();

        await this.save();

        console.log("end pooling");
    }
}

export default Iiko.getInstance();