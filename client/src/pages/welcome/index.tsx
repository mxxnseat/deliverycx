import cn from "classnames";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../routes/types";
import { RootState } from "../../store";
import CityList from "./CityList";
import SelectAdress from "./SelectAdress";

const ChooseAdress: FC = () => {
    const { city } = useSelector((state: RootState) => state.address);

    return (
        <div className="welcome">
            <div className="welcome__header">
                <div className="container row justify-between align-center">
                    

                    <div className="welcome__header__content">
                        Выберите <span className="select-red">город</span>
                    </div>

                    
                </div>
            </div>

            <CityList />
        </div >

    )
}

export default ChooseAdress;