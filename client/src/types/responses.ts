export interface ICity{
    _id: string,
    name: string
}

export interface IAddress{
    contacts: {
        phone: string,
        email: string
    },
    _id: string,
    cityId: ICity,
    latitude: number,
    longitude: number,
    street: string
}

export interface ICategory{
    images: {
        imageUrl: string
    },
    _id: string,
    code: string | null,
    isIncludedInMenu: boolean,
    name: string,
    order: number
}
export interface IProduct{
    images: {
        imageUrl: string
    },
    _id: string,
    category: string,
    code: string,
    group: string,
    isIncludedInMenu: boolean,
    name: string,
    order: number,
    price: number,
    weight: number,
    measureUnit: "порц" | "шт",
    description: string,
    additionalInfo: string,   
}

export interface ICart{
    _id: string,
    userId: string,
    product: IProduct,
    amount: number
}

export interface IUser{
    username: string,
    _id: string,
    isVerify: boolean,
    organization: IAddress
}

export interface IUpdateUserResponse{
    message: string,
    user: Omit<IUser, "organization">
}