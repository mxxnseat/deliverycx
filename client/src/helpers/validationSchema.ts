import * as yup from "yup";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Имя не может быть меньше 2 букв")
        .max(20, "Имя не может быть больше 20 букв")
        .matches(/^[a-zа-я]+$/gi, {
            message: "Имя не может состоять из цифр"
        }),
    phone: yup
        .string()
        .trim()
        .matches(/^(\+7)(\s(\d){3}){2}(\s(\d){2}){2}/, {
            message: "Не верный формат телефона"
        })
        .required('Поле обязательно для заполнения')
});

export default schema;