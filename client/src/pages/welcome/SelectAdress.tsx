import { FC, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SelectAddressPopup from "./SelectAddressPopup";
import { IAddress } from "../../types/responses";
import Api from "../../api/Api";

const placeMarkOption = {
    iconLayout: 'default#image',
    iconImageHref: require("../../assets/i/map_placemark.png").default,
    iconImageSize: [50, 60],
    iconImageOffset: [-25, -60]
}

const SelectAdress: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

    const selectAdressCN = cn("welcome__select-adress", { opened: isOpen });
    const selectedCity = useSelector((state: RootState) => state.address.city);


    useEffect(() => {
        (async ()=>{
            const cityId = selectedCity?._id;
            const {data} = await Api.getAddrresses<IAddress[]>(cityId);
            setAddresses(data);
        })();
    }, []);


    const placemarkClickHandler = (address: IAddress) => {
        setIsOpen(true);
        console.log(address);
        setSelectedAddress({...address});
    }

    return (
        <>
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

            <button className={selectAdressCN}>
                Выберите заведение
            </button>

            {
                selectedAddress ? <SelectAddressPopup {...selectedAddress} /> : ''
            }
        </>
    )
}

export default SelectAdress;