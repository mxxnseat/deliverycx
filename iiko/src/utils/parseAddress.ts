import { IOrganization } from "../types/axiosResponses";

function parseOrganization(obj: IOrganization) {
    const addressGroup = obj.address.match(/^(?<city>.+),\s?(?<address>.+)$/i)?.groups;

    const parseObj = {
        ...obj,
        id: obj.id,
        address: {
            fulladdress: obj.address,
            city: addressGroup ? addressGroup.city.trim() : null,
            address: addressGroup ? addressGroup.address.trim() : null
        },
        contacts: {
            phone: obj.contact.phone,
            email: obj.contact.email
        },
    };

    return parseObj;
}

export type Organization = ReturnType<typeof parseOrganization>;
export {
    parseOrganization
};