import { FC, useEffect, useState } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router";
import convertWeight from "../../../helpers/convertWeight";
import { IProduct } from "../../../types/responses";
import HeaderBack from "../../../components/HOC/HeaderBack";
import LinkToCart from "../LinkToCart";
import Sauce from "./Sauce";

import Api from "../../../api/Api";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { stat } from "fs";
import AddToCart from "../../../components/AddToCart";

interface IMatchProps {
    id: string
}
type RouteProps = RouteComponentProps<IMatchProps>;

interface IResponse{
    sauces: IProduct[],
    product: IProduct
}

const ProductCard: FC<RouteProps> = ({ match }) => {
    const history = useHistory();
    const [sauces, setSauces] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const organization = useSelector((state: RootState) => state.address.address._id);
    const productId = match.params.id;

    useEffect(() => {
        
        (async ()=>{
            const response = await Api.getProduct<IResponse>(productId, organization);
            console.log(response.data);
        
            setSauces(response.data.sauces);
            setProduct(response.data.product);
        })();
    }, []);

    return (
        product ? <div className="product-card">
            <HeaderBack backgroundColor="#fff" onClickCb={() => history.goBack()}>
                <div className="product-card__category">
                    <div className="category-image-wrap">
                        <img src={product.group.image} />
                    </div>
                </div>
            </HeaderBack>
            <div className="product-card__image-wrap">
                <div className="container">

                    <img className="product-card__image" src={product.image} alt="Картинка продукта" />

                    <div className="product-card__title">{product.name}</div>
                    <div className="row justify-between">
                        <button className="add-favorite"></button>
                        <div className="product-card__price">
                            <div className="product-card__measure">
                                {
                                    product.measureUnit === "порц" ? "1 шт" : `${convertWeight(product.weight)} г`
                                }
                            </div>
                            <span className="select-red">{product.price} ₽</span>
                        </div>
                        <AddToCart id={productId} classe={"product-card__add"} />
                    </div>
                </div>
            </div>
            {
                product.code && product.code.match(/^HI-\d+$/) ? <div className="product-card__henkali-info">
                <div className="product-card__order-from">Заказ от 3 шт.</div>
                <div className="product-card__bonus">
                    При заказе дюжины хинкалей<br />
                    Вы платите за 11!
                </div>
            </div> : ''
            }
            
            <div className="container">
                <div className="product-card__description">
                    {
                        product.description
                    }
                </div>
                <div className="product-card__ingredients">
                    <div className="product-card__ingredients__heading">Ингридиенты: </div>
                    {
                        product.additionalInfo
                    }
                </div>
                {
                    sauces ? (
                        <div className="product-card__sauces">
                            <div className="product-card__sauces__heading select-red">
                                <span className="border_dotted-circle">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </span>
                                Подать с соусом?
                                <span className="border_dotted-circle">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </span>
                            </div>

                            {
                                sauces.map(sauce=>{
                                    return <Sauce key={sauce.id} {...sauce}/>
                                })
                            }
                            
                        </div>
                    ) : ''
                }

            </div>

            <LinkToCart />
        </div> : <>loading...</>
    )
}

export default withRouter(ProductCard);