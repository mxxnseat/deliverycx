import cn from "classnames";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import CityList from "./CityList";
import SelectAdress from "./SelectAdress";

const ChooseAdress: FC = () => {
    const { city } = useSelector((state: RootState) => state.address);
    const welcomeHeaderCN = cn("welcome__header", { transparent: Object.keys(city).length });

    return (
        <div className="welcome">
            <div className={welcomeHeaderCN}>
                <div className="container row justify-between align-center">
                    <div className="welcome__header__ico-wrapper" >
                        <img src={require("../../assets/i/back.svg").default} alt="Вернуться назад" />
                    </div>

                    <div className="welcome__header__content">
                        {
                            !Object.keys(city).length ? <>Выберите <span className="select-red">город</span></> :
                                <>
                                    <img src={require("../../assets/img/logo.png").default} />
                                    <div className="select-red">{city.name}</div>
                                </>
                        }
                    </div>

                    <div className="welcome__header__ico-wrapper">
                        <img src={require("../../assets/i/aim.svg").default} alt="Цель" />
                    </div>
                </div>
            </div>

            {!Object.keys(city).length ? <CityList /> : <SelectAdress />}
        </div >

    )
}

export default ChooseAdress;