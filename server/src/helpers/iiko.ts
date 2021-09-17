import { IOrganization } from "../types/axiosResponses";

function parseOrganization(obj: IOrganization) {
    const addressGroup = obj.address.match(/^(?<city>[а-я]+),\s?(?<address>[а-я0-9\s]+)$/i)?.groups;

    const parseObj = {
        id: obj.id,
        address: {
            fulladdress: obj.address,
            city: addressGroup ? addressGroup.city.trim() : null,
            address: addressGroup ? addressGroup.address.trim() : null
        },
        contacts: {
            phone: obj.contact.phone,
            email: obj.contact.email
        }
    };

    return parseObj;
}

export type Organization = ReturnType<typeof parseOrganization>;
export {
    parseOrganization
};