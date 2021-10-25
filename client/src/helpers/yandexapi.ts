async function getGeoLocation(ymaps: any) {
    if(ymaps){
        const geolocation = await ymaps.geocode({ provider: 'yandex', mapStateAutoApply: true });
        console.log(ymaps);
    }
    
}



export {
    getGeoLocation
}