export interface IOrganization {
    address: string,
    contact: {
        email: string,
        phone: string
    },
    id: string
}

export interface IImage{
    uploadDate: string,
    imageUrl: string
}

export interface IProduct{
    id: string,
    code: string,
    parentGroup: string,
    productCategoryId: string,
    price: number,
    images: IImage[],
    weight: number,
    description: string,
    additionalInfo: string,
    isIncludedInMenu: boolean,
}
export interface IGroup{
    id: string,
    name: string,
    code: string,
    order: number,
    images: IImage[],
    isIncludedInMenu: boolean
}
export interface ICategory{
    id: string,
    name: string
}
export interface INomenclature{
    products: IProduct[],
    groups: IGroup[],
    productCategories: ICategory[]
    revision: number
}

export interface IOrderCheckCreationResult{
    problem: string,
    resultState: number,
    deliveryDurationInMinute: number
}

export interface IStopListItem{
    balance: number,
    productId: string
}
export interface IStopList{
    stopList: Array<{
        organizationId: string,
        deliveryTerminalId: string,
        items: IStopListItem[]
    }>,
    unregisteredOrganizations: unknown
}