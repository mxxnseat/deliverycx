import { FC, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectAddressPopup from "./SelectAddressPopup";
import { IAddress } from "../../types/responses";
import Api from "../../api/Api";
import { useHistory } from "react-router-dom";
import { getGeoLocation } from "../../helpers/yandexapi";

const placeMarkOption = {
    iconLayout: 'default#image',
    iconImageHref: require("../../assets/i/map_placemark2.png").default,
    iconImageSize: [50, 60],
    iconImageOffset: [-25, -60]
}

const mok = [
    {
        contacts: {
          "phone": "+7971111111",
          "email": "Onix1234x@gmail.com"
        },
        _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
        city: {
          "_id": "6169326c7759b79df383276c",
          "name": "Симферополь"
        },
        latitude: 44.965425,
        longitude: 39.012211,
        products: "6172ca3e130b3fdd43002979",
        street: "Турецкая 1111",
        workTime: "22",
    },
    {
        contacts: {
          "phone": "+797822222",
          "email": "Onix1234x@gmail.com"
        },
        _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
        city: {
          "_id": "6169326c7759b79df383276c",
          "name": "Симферополь"
        },
        latitude: 41.955435,
        longitude: 34.053521,
        products: "6172ca3e130b3fdd43002979",
        street: "Турецкая 2222",
        workTime: "22",
    },
    {
        contacts: {
          "phone": "+797833333",
          "email": "Onix1234x@gmail.com"
        },
        _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
        city: {
          "_id": "6169326c7759b79df383276c",
          "name": "Симферополь"
        },
        latitude: 45.935645,
        longitude: 31.065831,
        products: "6172ca3e130b3fdd43002979",
        street: "Турецкая 3333",
        workTime: "22",
    },
    {
        contacts: {
          "phone": "+797824444",
          "email": "Onix1234x@gmail.com"
        },
        _id: "5f850000-90a3-0025-1f21-08d98a63d2af",
        city: {
          "_id": "6169326c7759b79df383276c",
          "name": "Симферополь"
        },
        latitude: 47.975775,
        longitude: 32.096241,
        products: "6172ca3e130b3fdd43002979",
        street: "Турецкая 444",
        workTime: "22",
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
            setAddresses(data);
            nearPoint(data)
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

    const buttonClickHandler = () => {
        if (addresses) {
            setIsOpen(true);
            setSelectedAddress(addresses[slideIndex])
        }
    }


    const nearPoint = async (data:IAddress[]) => {
        const cord = await getGeoLocation()
        if (data) {
            const index = data.reduce(function (r, val, i, array) {
                return i &&
                    (Math.abs(array[r].latitude - cord[0]) < Math.abs(val.latitude - cord[0])
                    && Math.abs(array[r].longitude - cord[1]) < Math.abs(val.longitude - cord[1]))
                    ? r : i;
            }, -1);
            setslideIndex(index)
        }
        
    }

    const SlideHandler = (triger: string) => {
        if (addresses) {
            if (triger === 'prev') {
                setslideIndex((prev: number) => {
                    return prev <= 0 ? addresses.length - 1 : prev - 1
                })
            } else if (triger === 'next') {
                setslideIndex((prev: number) => {
                        return prev == addresses.length -1 ? 0 : prev + 1 
                }) 
            }
        }
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

                    <div className="welcome__header__ico-wrapper" onClick={()=> addresses && nearPoint(addresses)}>
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
            <button onClick={() => buttonClickHandler()} className={selectAdressCN}>
                Выберите заведение
            </button>

            {
               selectedAddress && addresses ? <SelectAddressPopup slideHandler={SlideHandler} address={addresses[slideIndex]} /> : ''
            }
          </div>       
        </>
    )
}

export default SelectAdress;