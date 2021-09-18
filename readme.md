# Contents
1. [Endpoints](#endpoints)
2. [Interfaces](#interfaces)
    + [City](#cityInterface)
    + [Address](#addressInterface)
    + [Category](#categoryInterface)
    + [Product](#productInterface)
    + [ICart](#cartInterface)

# Endpoints<a name="endpoints"></a>

## Api Endpoints
```

GET /api/getCities - return all cities
GET /api/getAddresses?cityId - return organizations in city
GET /api/getCategories - return categories
GET /api/getProducts?categoryId&organizationId - return products for organization and selected category
GET /api/getProduct/:id - return one product with id

```

## Shop Endpoints
all request to /shop need header authorization token
```
@body
/*
 * productId: string
*/
POST /shop/addToCart - return 200 if ok, 400 in other case
---------------------------------------------------------------

GET /shop/getCart - return user cart list
---------------------------------------------------------------

@param
/*
 * cartId: string
*/
DELETE /shop/remove/:cartId - return 200 if ok, 400 in other case
---------------------------------------------------------------

DELETE /shop/clear - return 200 if ok, 400 in other case
---------------------------------------------------------------

@body
/*
 * type: "inc" | "dec"
*/
PATCH /shop/changeAmount - return 200 if ok, 400 in other case
```

## Profile Endpoints
all request to /profile need header authorization token

```
@body
/*
 * organizationId: string
*/
POST /profile/login - return access token if ok, 401 in other case
```

# Interfaces<a name="interfaces"></a>

<a name="cityInterface"></a>

```ts
    interface ICity{
        _id: string,
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

<a name="cartInterface"></a>

```ts
    interface ICart{
        _id: string,
        userId: string,
        product: IProduct,
        amount: number
    }
```