import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
process.chdir(`${__dirname}/../..`);

import axios from "axios";
import {
  INomenclature,
  IOrganization as IOrganizationResponse,
  IStopList as IStopListResponse,
} from "./types/axiosResponses";
import { Organization, parseOrganization } from "./utils/parseAddress";
import { geoCode } from "./utils/geoCoder";
import download from "./utils/saveCdnImage";
import connection from "./connect";

import CategoryModel, { ICategory } from "./models/Category";
import CityModel, { ICity } from "./models/City";
import GroupModel, { IGroup } from "./models/Group";
import OrganizationModel, { IOrganization } from "./models/Organization";
import ProductModel, { IProduct, IProductSchema } from "./models/Product";
import StopListModel, { IStopList } from "./models/StopList";

class Iiko {
  private static token: string = "";
  private static _instance: Iiko;

  private organizations: Organization[] = [];

  private constructor() {}
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
      const tokenResponse = await axios.get<string>(
        `https://iiko.biz:9900/api/0/auth/access_token?user_id=${process.env.iiko_user}&user_secret=${process.env.iiko_password}`
      );

      Iiko.token = tokenResponse.data;
    } catch (e) {
      console.log(`Error with get token\n${e}`);
    }
  }
  private async getOrganizations() {
    try {
      console.log("starting get organizations");
      const organizationsResponse = await axios.get<IOrganizationResponse[]>(
        `https://iiko.biz:9900/api/0/organization/list?access_token=${Iiko.token}`
      );

      this.organizations = organizationsResponse.data
        .map((organization) => {
          return parseOrganization(organization);
        })
        .filter((organization) => {
          return !organization.description.match(/HIDDEN/i);
        });
    } catch (e) {
      console.log(`Error with get organizations\n${e}`);
    }
  }
  private async getAndSaveNomenclature() {
    try {
      for (let k in this.organizations) {
        const productsResponse = await axios.get<INomenclature>(
          `https://iiko.biz:9900/api/0/nomenclature/${this.organizations[k].id}?access_token=${Iiko.token}`
        );
        const organization = this.organizations[k];
        const isFindByRevision = await ProductModel.findOne({
          organization: this.organizations[k].id,
        });

        if (isFindByRevision?.revision === productsResponse.data.revision)
          continue;

        const nomenclature = {
          products: productsResponse.data.products,
          groups: productsResponse.data.groups,
          categories: productsResponse.data.productCategories,
          revision: productsResponse.data.revision,
        };
        console.log(organization.address);
        const city = await CityModel.findOneAndUpdate(
          { name: organization.address.city as string },
          {
            $setOnInsert: {
              name: organization.address.city as string,
            },
          },
          { new: true, upsert: true }
        );

        await Promise.all(
          nomenclature.categories.map(async (category) => {
            await CategoryModel.findOneAndUpdate(
              { _id: category.id },
              {
                ...category,
                _id: category.id,
              },
              { upsert: true }
            );
          })
        );

        await GroupModel.deleteMany({ organization: organization.id });
        await Promise.all(
          nomenclature.groups.map(async (group) => {
            await GroupModel.findOneAndUpdate(
              { _id: group.id },
              {
                ...group,
                image:
                  group.images && group.images.length
                    ? group.images[group.images.length - 1]?.imageUrl
                    : "",
                organization: organization.id,
                _id: group.id,
              },
              { upsert: true }
            );
          })
        );

        const productsToSave = await Promise.all(
          nomenclature.products
            .map(async (product: any) => {
              const image = await download(
                product.images && product.images.length
                  ? product.images[product.images.length - 1]?.imageUrl
                  : ""
              );
              if (product.tags === null || !product.tags.includes("hidden")) {
                return {
                  ...product,
                  image,
                  category: product.productCategoryId,
                  group: product.parentGroup,
                };
              } else {
                console.log(product);
              }
            })
            .filter((prod: any) => prod !== undefined)
        );

        const products = await ProductModel.findOneAndUpdate(
          { organization: organization.id },
          {
            $setOnInsert: {
              organization: organization.id,
            },
            revision: nomenclature.revision,
            $set: {
              products: productsToSave,
            },
          },
          { new: true, upsert: true }
        );

        const cord = await geoCode(organization.address.fulladdress);
        const workTime = organization.workTime
          ? organization.workTime.split(";")[0]
          : "";
        await OrganizationModel.findOneAndUpdate(
          { _id: organization.id },
          {
            $setOnInsert: {
              _id: organization.id,
              city: city._id,
              street: organization.address.address as string,
              longitude: cord?.longitude,
              latitude: cord?.latitude,
              products: products._id,
            },
            $set: {
              contacts: {
                ...organization.contacts,
              },
              workTime,
            },
          },
          { new: true, upsert: true }
        );
      }
    } catch (e) {
      console.log(`Error with get products\n${e}`);
    }
  }
  public async getStopLists(organizationId: string = "") {
    try {
      const organizations = await OrganizationModel.find({});
      organizations.forEach((organization: IOrganization) => {
        console.log(
          `Starting get stopLists for organization: ${organization._id}`
        );

        axios
          .get<IStopListResponse>(
            `https://iiko.biz:9900/api/0/stopLists/getDeliveryStopList?access_token=${Iiko.token}&organization=${organization._id}`
          )
          .then(async ({ data: { stopList } }) => {
            const list = stopList.map((el) => {
              return el.items;
            });

            await StopListModel.findOneAndUpdate(
              { organization: organization._id },
              {
                $setOnInsert: {
                  organization: organization._id,
                },
                $set: {
                  products: list,
                },
              },
              { upsert: true }
            );

            console.log(
              `End get stopLists for organization: ${organization._id}`
            );
          })
          .catch((e) => {
            console.log(`Error in stop lists ${organization._id}\n${e}`);
          });
      });
    } catch (e: unknown) {
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

const iiko = Iiko.getInstance();

connection()
  .then(async () => {
    await iiko.pooling();

    process.exit(1);
  })
  .catch((e) => {
    console.log(e);
    process.exit(0);
  });
