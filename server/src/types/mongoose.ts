import {Document} from "mongoose";

export interface FindOneAndUpdateReturnType<T>{
    lastErrorObject: {
        n: number,
        updatedExisting: boolean
    },
    value: T
}