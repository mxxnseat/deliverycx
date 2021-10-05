import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router";

const AdressInfo: FC = () => {
    const {address, city} = useSelector((state:RootState)=>state.address);
    const history = useHistory();
    return (
        <div className="adress_info">
            <div className="adress_info__city" onClick={()=>history.push("/")}>{address.city.name}</div>
            <div className="adress_info__street" onClick={()=>history.push("/address")}>{address.street}</div>
            <a href={"tel:" + address.contacts.phone} className="adress_info__phone">{address.contacts.phone}</a>
        </div> 
    )
}

export default AdressInfo;