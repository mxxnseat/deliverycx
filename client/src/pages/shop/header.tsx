import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./menu";
import { isSearchAction } from "../../store/actions/shop";

const Header: FC = () => {
    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const root: HTMLElement | null = document.querySelector("#root");
        if (!root) return;

        if (isActiveMenu) {
            root.style.overflowY = "hidden";
        } else {
            root.style.overflowY = "initial";
        }
    }, [isActiveMenu]);

    return (
        <header className="header">
            <Menu isActive={isActiveMenu} setter={() => setIsActiveMenu(false)} />

            <div className="header__burger-menu" onClick={() => setIsActiveMenu(true)}></div>
            <div className="header__logo">
                <img src={require("../../assets/img/logo.png").default} alt="Логотип" />
            </div>
            <div className="header__search" onClick={() => dispatch(isSearchAction(true))}></div>
        </header>
    )
}

export default Header;