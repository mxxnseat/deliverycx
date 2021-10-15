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

const mock = [
      {
        contacts: {
          "phone": "+79782287220",
          "email": "gareeva.lily@mail.ru"
        },
        city: {
          _id: "6169326c7759b79df383276c",
          name: "Симферополь"
        },
        _id:"",
        latitude: 44.945175,
        longitude: 34.099931,
        products: "6169326c7759b79df3832784",
        street: "Турецкая 25"
    },
    {
        contacts: {
          "phone": "+7978255555",
          "email": "gareeva.lily@mail.ru"
        },
        city: {
          _id: "6169326c7759b79df383276c",
          name: "Симферополь"
        },
        _id:"",
        latitude: 44.946406,
        longitude: 34.101494,
        products: "6169326c7759b79df3832784",
        street: "Турецкая 15"
    }  
]

const SelectAdress: FC = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [addresses, setAddresses] = useState<IAddress[] | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [slideIndex, setslideIndex] = useState(0)

    const selectAdressCN = cn("welcome__select-adress", { opened: isOpen });
    const selectedCity = useSelector((state: RootState) => state.address.city);

    const welcomeHeaderCN = cn("welcome__header", { transparent: Object.keys(selectedCity).length });
    useEffect(() => {
        if (Object.keys(selectedCity).length) {
           (async ()=>{
            const cityId = selectedCity?._id;
            const {data} = await Api.getAddrresses<IAddress[]>(cityId);
            setAddresses(mock);
        })(); 
        } else {
            history.push("/");
        }
        
        
    }, [selectedCity]);

    
    const placemarkClickHandler = (address: IAddress, index: number) => {
        setIsOpen(true);
        setSelectedAddress({...address})
        setslideIndex(index)
    }

    useEffect(() => {
        addresses && setSelectedAddress(addresses[slideIndex])
    },[slideIndex])


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
                                center: addresses[0] ? [addresses[slideIndex].latitude, addresses[slideIndex].longitude] : [0.0, 0.0],
                                zoom: 18
                            }}
                            state={{
                                center: addresses[0] ? [addresses[slideIndex].latitude, addresses[slideIndex].longitude] : [0.0, 0.0],
                                zoom: 18,
                                
                            }}
                        >
                            {
                                addresses.map((address, index) => {
                                    return (
                                        <Placemark
                                            onClick={() => placemarkClickHandler(address,index)}
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
               selectedAddress ? <SelectAddressPopup slideIndex={setslideIndex} slidecoutn={addresses?.length} address={selectedAddress} /> : ''
            }
          </div>       
        </>
    )
}

export default SelectAdress;