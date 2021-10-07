import * as yup from "yup";
import debounce from 'lodash.debounce';
import axios from "axios";

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


async function checkAddress(value: string, resolve: any){
    try{
        const address = encodeURI(value);
        const {data} = await axios.get<IGeoCodeResponse>(
            `https://geocode-maps.yandex.ru/1.x/?geocode=${address}&format=json&apikey=f5bd494f-4a11-4375-be30-1d2d48d88e93`
            )

        if(+data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found === 0) throw Error();
        
        resolve(true);
    }catch(e){
        resolve(false);
    }
}

const debounceCheckAddress = debounce(checkAddress, 600);


const schema = yup.object().shape({
    address: yup
            .string()
            .test('checkAddress', 'Не верно указан адрес', function(value){
                return new Promise(resolve=>debounceCheckAddress(value!, resolve));
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