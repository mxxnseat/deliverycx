import { FC } from "react";

interface IStock{
    content: number
}

const StocksItem: FC<IStock> = ({content}) => {


    return (
        <div className="stocks__item">
            <div className="stocks__type">
                <img src={require("../../../assets/img/stock_type.png").default} />
            </div>
            <div className="stocks__title">{content}Меняй «пятерки»</div>
            <div className="stocks__text">
                Получи пять «пятерок» за неделю
                и приходи за хачапури по-аджарски!
            </div>
        </div>
    )
}

export default StocksItem;