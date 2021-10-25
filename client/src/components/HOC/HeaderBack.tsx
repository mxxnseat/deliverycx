import {FC} from "react";
import {useHistory} from "react-router-dom"
 
interface IProps{
    backgroundColor?: string,
    onClickCb?: ()=>void
}

const HeaderBack: FC<IProps> = ({children, backgroundColor, onClickCb})=>{
    const history = useHistory();

    return (
        <div className="header-back" style={{backgroundColor}}>
            <div className="container">
                <div className="cart__header">
                    <button onClick={onClickCb ? onClickCb : history.goBack} className="header-back__return-btn">
                        <img src={require('../../assets/i/back.svg').default} alt="Вернуться назад" />
                    </button>
                    <div className="header-back__content">
                        {
                            children    
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderBack;