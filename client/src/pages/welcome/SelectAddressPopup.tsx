import { FC, memo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAddress } from "../../types/responses";
import { setAddressAction } from "../../store/actions/adress";
import { setProfileAction } from "../../store/actions/profile";
import profile from "../../api/Profile";
import { number } from "yup";

interface IProps {

   slideHandler: any;
   address: IAddress;
}

const SelectAddressPopup: FC<IProps> = memo(({ slideHandler, address }) => {
   const history = useHistory();
   const dispatch = useDispatch();

   const selectAdressHandler = async () => {
      try {
         const { status, data: regData } = await profile.register<{
            isNew: boolean;
            access?: string;
         }>(address._id);

         if (regData.isNew) {
            localStorage.setItem("authToken", regData.access!);
         }

         dispatch(setAddressAction(address));

         const { data } = await profile.update({
            organization: address._id,
         });
         dispatch(
            setProfileAction({
               isAuth: true,
               ...data.user,
            })
         );
         history.push("/shop");
      } catch (e) {
         history.push("/");
      }
   };

   return (
      <div className="welcome__select-adress opened">
         <div className="container">
            <div className="welcome__select-adress__header ">
               <div className="prev" onClick={() => slideHandler("prev")}>
                  <img
                     src={require("../../assets/i/prev.svg").default}
                     alt="Предыдущее заведенеие"
                  />
               </div>
               <div className="welcome__select-adress__adress">
                  Старик Хинкалыч
               </div>
               <div className="next" onClick={() => slideHandler("next")}>
                  <img
                     src={require("../../assets/i/next.svg").default}
                     alt="Следующее заведенеие"
                  />
               </div>
            </div>

            <div className="welcome__select-adress__work-time">
               {address.workTime}
            </div>

            <div className="welcome__select-adress__info street">
               <img
                  src={require("../../assets/i/mark-red.svg").default}
                  alt="Телефон заведения"
               />

               {address.street}
            </div>
            <div className="welcome__select-adress__info phone">
               <img
                  src={require("../../assets/i/phone-green.svg").default}
                  alt="Телефон заведения"
               />

               <a href={`tel: ${address.contacts.phone}`}>
                  {address.contacts.phone}
               </a>
            </div>

            <div
               className="btn welcome__select-adress__btn"
               onClick={selectAdressHandler}
            >
               Выбрать
            </div>
         </div>
      </div>
   );
});

export default SelectAddressPopup;
