# Contents
1. [Endpoints](#endpoints)
2. [Interfaces](#interfaces)
    + [City](#cityInterface)
    + [Address](#addressInterface)
    + [Category](#categoryInterface)
    + [Product](#productInterface)

# Endpoints<a name="endpoints"></a>

## Api Endpoints
```

/api/getCities - return all cities
/api/getAddresses?cityId - return organizations in city
/api/getCategories - return categories
/api/getProducts?categoryId&organizationId - return products for organization and selected category
/api/getProduct/:id - return one product with id

```

# Interfaces<a name="interfaces"></a>

<a name="cityInterface"></a>

```ts
    interface ICity{
        _id: mongoose.Types.ObjectId,
        name: string
    }
```

<a name="addressInterface"></a>

```ts
    interface IAddress{
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
```

<a name="categoryInterface"></a>

```ts
    interface ICategory{
        images: {
            imageUrl: string
        },
        _id: string,
        code: string | null,
        isIncludedInMenu: boolean,
        name: string,
        order: number
    }
```

<a name="productInterface"></a>

```ts
    interface IProduct{
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
```