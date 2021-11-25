import axios from "axios";
import { parseOrganization, Organization } from "../helpers/iiko";
import * as model from "../db/models";
import { ICity } from "../db/models/api/City";
import { geoCode, IPosition } from "../helpers/geoCoder";
import { IOrganization as IApiOrganization } from "../db/models/api/Organization";
import {
  ICategory,
  IGroup,
  INomenclature,
  IOrganization,
  IProduct,
  IOrderCheckCreationResult,
  IStopList,
} from "../types/axiosResponses";
import { IProductSchema } from "db/models/api/Product";
import { createOrderType } from "helpers/createOrder";
import download from "../utils/saveCdnImage";
import { resolve } from "path/posix";

class Iiko {
  private static token: string = "";
  private static _instance: Iiko;

  private organizations: Organization[] = [];

  private constructor() {}
  public async iikoMethodBuilder(fn: () => any) {
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
      const tokenResponse = await axios.get<string>(
        `https://iiko.biz:9900/api/0/auth/access_token?user_id=${process.env.iiko_user}&user_secret=${process.env.iiko_password}`
      );

      Iiko.token = tokenResponse.data;
    } catch (e) {
      console.log(`Error with get token\n${e}`);
    }
  }
  public async createOrder(orderBody: createOrderType) {
    try {
      const { data: checkData } = await axios.post<IOrderCheckCreationResult>(
        `https://iiko.biz:9900/api/0/orders/checkCreate?access_token=${Iiko.token}`,
        orderBody
      );

      if (checkData.resultState !== 0) {
        return {
          status: 400,
          message: checkData.problem,
        };
      }
      const { data: createData } = await axios.post(
        `https://iiko.biz:9900/api/0/orders/add?access_token=${Iiko.token}`,
        orderBody
      );

      return {
        status: 200,
        message: createData,
        number: createData.number,
      };
    } catch (e: any) {
      return {
        status: e.response.data.httpStatusCode,
        message: e.response.data.description,
      };
    }
  }
  public async getStopList(organization: string) {
    try {
      const { data } = await axios.get<IStopList>(
        `https://iiko.biz:9900/api/0/stopLists/getDeliveryStopList?access_token=${Iiko.token}&organization=${organization}`
      );

      const list = data.stopList.map((el) => {
        return el.items;
      });

      return list.flat();
    } catch (e: unknown) {
      console.log(e);
      return [];
    }
  }
}

export default Iiko.getInstance();
