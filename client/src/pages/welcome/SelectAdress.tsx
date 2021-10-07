import { FC, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectAddressPopup from "./SelectAddressPopup";
import { IAddress } from "../../types/responses";
import Api from "../../api/Api";
import { useHistory } from "react-router";

const placeMarkOption = {
    iconLayout: 'default#image',
    iconImageHref: require("../../assets/i/map_placemark.png").default,
    iconImageSize: [50, 60],
    iconImageOffset: [-25, -60]
}

const SelectAdress: FC = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [addresses, setAddresses] = useState<IAddress[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

    const selectAdressCN = cn("welcome__select-adress", { opened: isOpen });
    const selectedCity = useSelector((state: RootState) => state.address.city);

    const welcomeHeaderCN = cn("welcome__header", { transparent: Object.keys(selectedCity).length });
    useEffect(() => {
        if (Object.keys(selectedCity).length) {
           (async ()=>{
            const cityId = selectedCity?._id;
            const {data} = await Api.getAddrresses<IAddress[]>(cityId);
            setAddresses(data);
        })(); 
        } else {
            history.push("/");
        }
        
        
    }, [selectedCity]);


    const placemarkClickHandler = (address: IAddress) => {
        setIsOpen(true);
        setSelectedAddress({...address});
    }

    

    return (
        <>
         <div className="welcome">  
            <div className={welcomeHeaderCN}>
                <div className="container row justify-between align-center">
                    <div className="welcome__header__ico-wrapper" onClick={()=> history.push("/")} >
                        <img src={require("../../assets/i/back.svg").default} alt="Вернуться назад" />
                    </div>

                    <div className="welcome__header__content">
                        {
                            Object.keys(selectedCity).length &&
                                <>
                                    <img src={require("../../assets/img/logo.png").default} />
                                    <div className="select-red">{selectedCity.name}</div>
                                </>
                        }
                    </div>

                    <div className="welcome__header__ico-wrapper">
                        <img src={require("../../assets/i/aim.svg").default} alt="Цель" />
                    </div>
                </div>
                </div>   
                { addresses &&
                    <YMaps>
                        <Map
                            className="welcome__map"
                            width="100"
                            height="100vh"
                            defaultState={{
                                center: addresses[0] ? [addresses[0].latitude, addresses[0].longitude] : [0.0, 0.0],
                                zoom: 18
                            }}
                        >
                            {
                                addresses.map((address, index) => {
                                    return (
                                        <Placemark
                                            onClick={() => placemarkClickHandler(address)}
                                            key={index}
                                            options={placeMarkOption}
                                            geometry={[address.latitude, address.longitude]}
                                        />
                                    );
                                })
                            }
                        </Map>
                    </YMaps>
                }
            <button className={selectAdressCN}>
                Выберите заведение
            </button>

            {
               selectedAddress ? <SelectAddressPopup {...selectedAddress} /> : ''
            }
          </div>       
        </>
    )
}

export default SelectAdress;