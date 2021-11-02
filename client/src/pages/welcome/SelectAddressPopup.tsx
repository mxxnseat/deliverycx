import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAddress } from "../../types/responses";
import { setAddressAction } from "../../store/actions/adress";
import { setProfileAction } from "../../store/actions/profile";
import profile from "../../api/Profile";
import { number } from "yup";

interface IProps{
    slideIndex: any
    slidecoutn:number | unknown
    address:IAddress
}

const SelectAddressPopup:FC<IProps> = memo(({slideIndex,slidecoutn,address}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const selectAdressHandler = async () => {
        try{
            const {status, data: regData} = await profile.register<{isNew: boolean, access?: string}>(address._id);

            if(regData.isNew){
                localStorage.setItem("authToken", regData.access!);
            }

            dispatch(setAddressAction(address));

            const {data} = await profile.update({ organization: address._id });
            dispatch(setProfileAction({
                isAuth: true,
                ...data.user
            }));
            history.push("/shop");

        }catch(e){
            history.push("/");
        }
        
    }

    const SlideHandler = (triger: string) => {
        
        if (triger === 'prev') {
            slideIndex((prev: number) => {
               return prev <= 0 ? 0 : prev - 1 
            })
        } else if (triger === 'next') {
           if (typeof slidecoutn === 'number') {
                slideIndex((prev: number) => {
                    return prev <= slidecoutn -1 ? slidecoutn -1 : prev + 1 
            }) 
           } 
        }
    }

    return (
        <div className="welcome__select-adress opened">
            <div className="container">
                <div className="welcome__select-adress__header ">
                    <div className="prev" onClick={()=> SlideHandler('prev')}>
                        <img src={require("../../assets/i/prev.svg").default} alt="Предыдущее заведенеие" />
                    </div>
                    <div className="welcome__select-adress__adress">
                        Старик Хинкалыч
                    </div>
                    <div className="next" onClick={()=> SlideHandler('next')}>
                        <img src={require("../../assets/i/next.svg").default} alt="Следующее заведенеие" />
                    </div>
                </div>

                <div className="welcome__select-adress__work-time">{address.workTime}</div>

                <div className="welcome__select-adress__info street">
                    <img src={require("../../assets/i/mark-red.svg").default} alt="Телефон заведения" />

                    ул.{address.street}
                </div>
                <div className="welcome__select-adress__info phone">
                    <img src={require("../../assets/i/phone-green.svg").default} alt="Телефон заведения" />

                    <a href={`tel: ${address.contacts.phone}`}>
                        {
                            address.contacts.phone
                        }
                    </a>
                </div>

                {/* <div className="welcome__select-adress__counter">
                    <img src={require("../../assets/i/hinkalya-red.svg").default} />

                    <div className="counter-frame-wrapper">
                        <div className="counter-frame">
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                        </div>
                        <div className="counter-frame">
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                        </div>
                        <div className="counter-frame">
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                            <div className="counter-frame__digit">9</div>
                        </div>
                    </div>

                </div> */}

                <div className="btn welcome__select-adress__btn" onClick={selectAdressHandler}>Выбрать</div>
            </div>
        </div>
    )
})

export default SelectAddressPopup;