import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { RootState } from "../../store";

declare var ymaps: any;

const MapSuggestComponent = ({ formikHandle }: any) => {
    const { name } = useSelector((state: RootState) => state.address.address.city);
    const [state, setstate] = useState('');

    useEffect(() => {
        const suggestView = new ymaps.SuggestView(
          'suggest', {
            provider: {
              suggest: (function(request:string) {
              
                setstate(request)
                return ymaps.suggest(name + ", " + request)
                })
              }}
            )
          
        
    }, [ymaps.SuggestView]);
  
    const ClickHandleInput = useCallback((e:any) => {
      e.target.value = state
      return formikHandle(e)
    },[state])
    
    return <input 
      className="form__field-wrapper__input"
      type="text" id="suggest"    
      name="address"
      placeholder="Адресс доставки"
      onChange={formikHandle}
      onClick={ClickHandleInput}
    />;
}


export default MapSuggestComponent