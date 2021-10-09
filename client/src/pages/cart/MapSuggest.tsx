import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";

declare var ymaps: any;

const MapSuggestComponent = ({ handl }: any) => {
    const { name } = useSelector((state: RootState) => state.address.city);
    
  useEffect(() => {
      
      const suggestView = new ymaps.SuggestView(
        'suggest', {
          provider: {
            suggest: (function(request:any, options:any) {
              console.log(request,options)
              return ymaps.suggest(name + ", " + request)
              })
            }}
          )
        
      
    }, [ymaps.SuggestView]);
  
    return <input 
      className="form__field-wrapper__input"
      type="text" id="suggest"    
      name="address"
      placeholder="Адресс доставки"
      onChange={handl}
    />;
}


export default MapSuggestComponent