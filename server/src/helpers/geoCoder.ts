import axios from "axios";
import {DOMParser} from "xmldom";
import { AsyncReturnType } from "types/asyncReturnType";

export interface IPosition {
    longitude: number,
    latitude: number
}
function parseXmlToCord(data: string, queryString: string): IPosition | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const splitQuery = queryString.split(" ");
    let searchContent: Element | string = xmlDoc.documentElement.getElementsByTagName(splitQuery[0])[0];
    searchContent = searchContent.getElementsByTagName(splitQuery[1])[0].firstChild?.textContent as string;

    if (typeof searchContent == "string") {
        const [long, lat] = searchContent.split(" ");

        return {
            longitude: +long,
            latitude: +lat
        }
    }

    return null;
}

export async function geoCode(address: string) {
    try{
        const addressUri = encodeURI(address);
        const responseGeoCode = await axios.get<string>(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.yandex_apiKey}&geocode=${addressUri}`)
        if(responseGeoCode.status !== 200){
            return null
        }
        const cord = parseXmlToCord(responseGeoCode.data, "Point pos");
    
        return cord;
    }catch(e){
        console.log(e);
        return null
    }
    
}

interface IGeoCodeResponse{
    response: {
        GeoObjectCollection: {
            featureMember: Array<{
                GeoObject: {
                    metaDataProperty: {
                        GeocoderMetaData: {
                            Address: {
                                Components: Array<{
                                    kind: string,
                                    name: string
                                }>
                            }
                        }
                    }
                    name: string
                }
            }>,
            metaDataProperty: {
                GeocoderResponseMetaData: {
                    found: string,
                    requrest: string,
                    results: string
                }
            }
        }
    }
}

export type SeparateType = {
    [key: string]: string
}

export async function separateAddress(address: string){
    address = encodeURI(address);

    const {data, status} = await axios.get<IGeoCodeResponse>(
        `https://geocode-maps.yandex.ru/1.x/?geocode=${address}&format=json&apikey=${process.env.yandex_apiKey}`
        );
    console.log(data);
    if(status !== 200) return {status,message: "Something went wrong"}
    if(+data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found === 0) return {status: 400, message: "Не верно задан адрес"}

    const separateAddressObject:SeparateType = {};
    
    data.response.GeoObjectCollection.featureMember[0]
    .GeoObject.metaDataProperty.GeocoderMetaData
    .Address.Components
    .forEach(el=>{
        separateAddressObject[el.kind] = el.name;
    })

    console.log(separateAddressObject);

    return {
        status: 200,
        message: "OK",
        separateAddressObject
    };
}
export type SeparateReturnType = AsyncReturnType<typeof separateAddress>

export default parseXmlToCord;