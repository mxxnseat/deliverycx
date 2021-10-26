import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";

declare var ymaps: any;

const MapSuggestComponent = ({formik,handl}: any) => {
  const { name } = useSelector((state: RootState) => state.address.address.city);
  
  const geoCode = (request: string) => {
    return ymaps.geocode(request)
      .then((res: any) => {
        const getObj = res.geoObjects.get(0)
        const validAdress: string = getObj.properties.get('metaDataProperty.GeocoderMetaData.precision')
        if (validAdress === 'exact') {
          handl(getObj.geometry._coordinates)

        }
      })
      .catch((e:unknown) => console.log(e))
  }

    useEffect(() => {
        const suggestView = new ymaps.SuggestView(
          'suggest', {
            provider: {
              suggest: (function(request:string) {
                geoCode(request)
               
                return ymaps.suggest(name + ", " + request)
                })
              }}
            )
            suggestView.events.add("select", function (e: any) {
              geoCode(e.get('item').value)
            })
            
        
    }, [ymaps.SuggestView]);
    /*
    const ClickHandleInput = useCallback((e:any) => {
      e.target.value = state
      return formikHandle(e)
    },[state])
    */
    
    return <input 
      className="mapsPopup__input"
      type="text" id="suggest"    
      name="address"
      placeholder="Введите адресс доставки"
      onClick={()=> formik.setFieldValue("address", '')}
    />;
}


export default MapSuggestComponent