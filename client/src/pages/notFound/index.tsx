import { FC } from "react";
import HeaderBack from "../../components/HOC/HeaderBack";
import {history} from "../../";

const NotFound: FC = () => {
    return (
        <>
            <HeaderBack onClickCb={()=>history.push("/shop")} backgroundColor="#ffffff">
                Страница <span className="select-red">не найдена</span>
            </HeaderBack>

            <div className="_404">
                <h1>404</h1>
                <div className="_404__content">
                    <b>Ошибка.</b>
                    Страница не найдена.
                </div>
            </div>
        </>

    );
}

export default NotFound;