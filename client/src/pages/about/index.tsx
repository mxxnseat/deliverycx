import { FC } from "react";
import { useHistory } from "react-router-dom";
import HeaderBack from "../../components/HOC/HeaderBack";

const About: FC = () => {
    const history = useHistory();
    return (
        <div className="about">
            <HeaderBack backgroundColor="#fff" onClickCb={() => history.push("/shop")}>
                О сервисе
            </HeaderBack>
            <div className="container">
                <div className="about__content">
                    <p>Мы подумали – никому не нравится стоять в очереди, давайте
                        сделаем такое приложение, чтобы можно было заказать
                        что угодно прямо за столик. И чтобы его не нужно было искать
                        в AppStore или Google Play и скачивать, чтобы оно запускалось
                        сразу со стола. И чтобы не требовало регистрации. И чтобы можно
                        было сохранить карту, и платить в 1 клик. И чтобы можно было
                        добавить любимый хачапури и нататхари
                        в избранное, и тратить на заказ не больше 5 секунд.  И чтобы....
                    </p>
                    <br />
                    <p>
                        <span className="select-red">Пишите нам</span>, мы будем рады услышать,  что мы можем улучшить или добавить!
                        Мы хотим, чтобы у нас были самые вкусные круассаны, и самое лучшее
                    </p>
                </div>

                <div className="condition">
                    Условия использования
                    Политика конфеденциальности
                </div>
            </div>

        </div>

    )
}

export default About;