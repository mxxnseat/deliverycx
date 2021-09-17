import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router";

const AdressInfo: FC = () => {
    const {address, city} = useSelector((state:RootState)=>state.address);
    const history = useHistory();
    return (
        <div className="adress_info" onClick={()=>history.push("/")}>
            <div className="adress_info__city">{city?.name}</div>
            <div className="adress_info__street">{address.street}</div>
            <div className="adress_info__phone">{address.contacts.phone}</div>
        </div> 
    )
}

export default AdressInfo;