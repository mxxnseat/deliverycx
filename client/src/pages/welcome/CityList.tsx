import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import axios from "axios";

import { setCityAction } from "../../store/actions/adress";
import { RootState } from "../../store";
import Api from "../../api/Api";
import { ICity } from "../../types/responses";
import { useHistory } from "react-router-dom";
import debounce from 'lodash.debounce';

const CityList: FC<{}> = () => {
    const history = useHistory();
    const { city: selectedCity } = useSelector((state: RootState) => state.address);
    const [cities, setCities] = useState<ICity[]>([]);
    const dispatch = useDispatch();
    

    useEffect(() => {
        (async ()=>{
            const {data} = await Api.getCities<ICity[]>();
            console.log(data);
            setCities([...data]);
        })();
    }, []);
    
    const actionsWrapper = (city: ICity)=>{
        dispatch(setCityAction(city));
        history.push("/address");
    }
    const cityInputHandler = (e: any)=>{
        (async()=>{
            const {data} = await Api.getCities<ICity[]>(e.target.value)
            setCities([...data]);
        })();
    }

    return (
        <div className="container welcome__city-list">
            <div className="welcome__search">
                <img src={require("../../assets/i/search-sm.svg").default} alt="Поиск города" />

                <input type="text" className="welcome__search__input" placeholder="Поиск"onChange={cityInputHandler} />
            </div>

            {
                cities.map(city => {
                    const CN = cn("welcome__city", { selected: city.name === selectedCity?.name })
                    return <div key={city._id} onClick={() => actionsWrapper(city)} className={CN}>
                        {city.name}
                    </div>
                })
            }
        </div>
    )
}

export default CityList;