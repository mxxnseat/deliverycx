import axios from "axios";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";
import { IGeoCodeResponse } from "../../types/responses";

declare var ymaps: any;

const MapSuggestComponent = ({ formik, handl, cord,disc }: any) => {
  const { name } = useSelector((state: RootState) => state.address.address.city);
  
  const geoCode = (request: string, set: boolean) => {
    return ymaps.geocode(`${name}, ${request}`)
      .then((res: any) => {
        const getObj = res.geoObjects.get(0);
        const validAdress: string = getObj?.properties.get('metaDataProperty.GeocoderMetaData.precision');
        const cords = [...getObj.geometry._coordinates]
        
        if (validAdress === 'exact') {
          handl(cords)
          cord(cords)
          disc(false)
          axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${cords.reverse()}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
          ).then(({ data }) => {
              formik.setFieldValue("address", data.response.GeoObjectCollection.featureMember[0].GeoObject.name);
              
          })
          //formik.setFieldValue("address", request);
        }
        if (validAdress === 'street') {
          disc(true)
          handl(cords)
        }
      })
      .catch((e: unknown) => console.log(e))
  }
  

  useEffect(() => {
    const suggestView = new ymaps.SuggestView(
      'suggest', {
      provider: {
        suggest: (function (request: string) {
          geoCode(request, false)
               
          return ymaps.suggest(name + ", " + request)
        })
      }
    }
    )
    suggestView.events.add("select", function (e: any) {
      geoCode(e.get('item').value, true)
              
    })
            
        
  }, [ymaps.SuggestView]);
    
    return <input 
      className="mapsPopup__input"
      type="text" id="suggest"    
      name="address"
      defaultValue={formik.values.address}
      placeholder="Введите адресс доставки"
      
    />;
}


export default MapSuggestComponent