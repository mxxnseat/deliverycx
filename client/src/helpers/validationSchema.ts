import * as yup from "yup";
import debounce from 'lodash.debounce';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import store from "../store";

interface IGeoCodeResponse{
    response: {
        GeoObjectCollection: {
            featureMember: Array<{
                GeoObject: {
                    metaDataProperty: {
                        GeocoderMetaData: {
                            Address: {
                                Components: Array<{
                                    kind: string,
                                    name: string
                                }>
                            }
                        }
                    }
                    name: string
                }
            }>,
            metaDataProperty: {
                GeocoderResponseMetaData: {
                    found: string,
                    requrest: string,
                    results: string
                }
            }
        }
    }
}

const findSiti = (GeoCode: {
    Components:
        Array<{
            kind: string,
            name: string
        }>
}): boolean | void => {
        const getSiti = store.getState()
        const kind = (element:any, index:number) => (element.kind === 'locality')
    const GeoName = GeoCode.Components.find(kind)
    console.log(GeoCode.Components)
        return GeoName?.name === getSiti.address.city.name
}

async function checkAddress(value: string, resolve: (value: boolean)=>void){
    try{
        const address = encodeURI(value);
        const {data} = await axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${address}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
        )
        const GeoCode = data.response
        .GeoObjectCollection
        .featureMember[0]
        .GeoObject
        .metaDataProperty
        .GeocoderMetaData
        .Address
        
       
        // //!findSiti(GeoCode) пофиксить баг  
        // if(GeoCode.Components.length < 7) throw Error();    
        if(+data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found === 0 ) throw Error();
        
        resolve(true);
    }catch(e){
        resolve(false);
    }
}

const debounceCheckAddress = debounce(checkAddress, 200);


const schema = yup.object().shape({
    address: yup
            .string()
            .test('checkAddress', 'Не верно указан адрес', function(value){
                return new Promise(resolve => debounceCheckAddress(value!, resolve));
            })
            .min(5, "Не верно указан адрес")
            .required('Поле обязательно для заполнения'),
    name: yup
        .string()
        .min(2, "Имя не может быть меньше 2 букв")
        .max(20, "Имя не может быть больше 20 букв")
        .matches(/^[a-zа-я]+$/gi, {
            message: "Имя не может состоять из цифр"
        })
        .required('Поле обязательно для заполнения'),
    phone: yup
        .string()
        .trim()
        .matches(/^(\+7)(\s(\d){3}){2}(\s(\d){2}){2}/, {
            message: "Не верный формат телефона"
        })
        .required('Поле обязательно для заполнения')
});

export default schema;