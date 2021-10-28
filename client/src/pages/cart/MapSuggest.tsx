import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";

declare var ymaps: any;

const MapSuggestComponent = ({formik,handl,value}: any) => {
  const { name } = useSelector((state: RootState) => state.address.address.city);
  
  const geoCode = (request: string,set:boolean) => {
    return ymaps.geocode(request)
      .then((res: any) => {
        const getObj = res.geoObjects.get(0);
        const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
        
        if (validAdress === 'exact') {
          handl([...getObj.geometry._coordinates])
          set && formik.setFieldValue("address", request);
        }
      })
      .catch((e:unknown) => console.log(e))
  }

    useEffect(() => {
        const suggestView = new ymaps.SuggestView(
          'suggest', {
            provider: {
              suggest: (function (request: string) {
                geoCode(request, false)
               
                return ymaps.suggest(name + ", " + request)
                })
              }}
            )
            suggestView.events.add("select", function (e: any) {
              geoCode(e.get('item').value,true)
              
            })
            
        
    }, [ymaps.SuggestView]);
    /*
    const ClickHandleInput = useCallback((e:any) => {
      e.target.value = state
      return formikHandle(e)
    },[state])
    */
  console.log(value)
    
    return <input 
      className="mapsPopup__input"
      type="text" id="suggest"    
      name="address"
      
      placeholder="Введите адресс доставки"
      onClick={()=> formik.setFieldValue("address", '')}
    />;
}


export default MapSuggestComponent