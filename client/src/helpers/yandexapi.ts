function getGeoLocation() {
    const ymaps = (window.ymaps as any);
    console.log(ymaps);
    if(ymaps.geolocation){
        console.log(ymaps.geolocation.get(0));
        return ymaps.geolocation?.get(0).then((res: any)=>res.geoObjects.position);
    }    
    return new Promise((res, rej)=>rej("ymaps not found"));
}



export {
    getGeoLocation
}