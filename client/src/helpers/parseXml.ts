interface IPosition{
    long: number,
    lat: number
}

function parseXmlToCord(data: string, queryString:string): IPosition | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const searchContent = xmlDoc.querySelector("Point pos")?.textContent;

    if (typeof searchContent == "string") {
        const [long, lat] = searchContent.split(" ");

        return {
            long: +long,
            lat: +lat
        }
    }
    
    return null;
}

export default parseXmlToCord;