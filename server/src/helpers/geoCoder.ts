import axios from "axios";
import {DOMParser} from "xmldom";

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

export default parseXmlToCord;