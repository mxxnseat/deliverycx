import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import LinkToCart from "../LinkToCart";
import ProductList from "../product_list";
import { isSearchAction } from "../../../store/actions/shop";
import debounce from "../../../utils/debounce";

const ShopSearch: FC = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState<string>('');

    function searchHandler(e: ChangeEvent<HTMLInputElement>){
        setSearchQuery(e.target.value)
    }

    return (
        <div className="header__search-window">
            <div className="header__search-field">
                <div className="container">
                    <img className="header__search-field__search" src={require("../../../assets/i/search.svg").default} />
                    <input type="text" value={searchQuery} onChange={searchHandler} placeholder="Искать" />
                    <img onClick={() => dispatch(isSearchAction(false))} className="header__search-field__close" src={require("../../../assets/i/close.svg").default} />
                </div>
            </div>
            <div className="header__search-list">
                <div className="container">
                    <ProductList searchQuery={searchQuery} />
                </div>
                <LinkToCart />
            </div>
        </div>
    );
}

export default ShopSearch;