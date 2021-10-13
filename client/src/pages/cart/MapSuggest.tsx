import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";

declare var ymaps: any;

const MapSuggestComponent = ({ handl }: any) => {
    const { name } = useSelector((state: RootState) => state.address.city);
    const [state, setstate] = useState('')
    useEffect(() => {
        
        const suggestView = new ymaps.SuggestView(
          'suggest', {
            provider: {
              suggest: (function(request:any, options:any) {
              
                setstate(request)
                return ymaps.suggest(name + ", " + request)
                })
              }}
            )
          
        
    }, [ymaps.SuggestView]);
  
    const ClickHendl = useCallback((e:any) => {
      e.target.value = state
      return handl(e)
    },[state])
    
    return <input 
      className="form__field-wrapper__input"
      type="text" id="suggest"    
      name="address"
      placeholder="Адресс доставки"
      onChange={handl}
      onClick={ClickHendl}
    />;
}


export default MapSuggestComponent