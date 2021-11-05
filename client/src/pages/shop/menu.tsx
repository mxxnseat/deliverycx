import { FC, memo, PropsWithChildren } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { isEqual } from "lodash";

interface IProps{
    isActive: boolean,
    setter: ()=>void
}

const Menu: FC<IProps> = ({isActive, setter})=>{
    const menuCN = cn("header__menu", {active: isActive});

    return (
        <div className={menuCN}>
            
                <div className="header__menu__header">
                    <div className="header__menu__close" onClick={setter}></div>
                    <div className="header__logo"><img src={require("../../assets/img/logo.png").default} alt="Логотип" /></div>
                </div>
                <div className="header__menu__list">
                    {/* <div className="header__menu__table">
                        Ваш столик
                    </div>
                    <div className="header__menu__qrcode-wrap">
                        <div className="header__menu__qrcode__memo">
                            Нажмите чтобы отсканировать
                        </div>
                        <div className="header__menu__qrcode">
                            <img src={require("../../assets/img/qrcode.png").default} alt="qrcode" />
                        </div>
                    </div>
                    <div className="header__menu__table-number">
                        54654
                    </div> */}
                    <div className="header__menu__link__list">
                        {/* <a href="#" className="header__menu__link profile">Профиль</a> */}
                        {/* <a href="#" className="header__menu__link qrcode">Номер столика</a> */}
                        <Link to="/" className="header__menu__link mark">Выбор заведения</Link>
                        {/* <a href="#" className="header__menu__link order-history">История заказов</a> */}
                        <a href="https://t.me/lokolyapis" target="_blank" className="header__menu__link messanger">Связаться с нами</a>
                        <Link to="/about" className="header__menu__link faq">О сервисе</Link>
                        <a target="_blank" rel="noreferrer" href="//xn--80aaudyq1a9a.xn--80apgfh0ct5a.xn--p1ai/" className="header__menu__link franchise">Франшиза</a>
                    </div>
                </div>
                <div className="header__menu__bg-images"></div>
            
        </div>
    )
}

export default memo(Menu, (prev: Readonly<PropsWithChildren<IProps>>, next: Readonly<PropsWithChildren<IProps>>)=>{
    if(isEqual(prev, next)){
        return true;
    }else{
        return false;
    }
});