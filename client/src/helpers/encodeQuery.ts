function encodeQueryData(data: Record<string, string>): string {
    const ret = [];
    for (let d in data){
        if(data[d] !== undefined){
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    }
    return ret.join('&');
 }


export default encodeQueryData;