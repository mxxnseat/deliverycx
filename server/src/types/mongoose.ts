import {Types, Document} from "mongoose"

export interface ILastErrorObject{
    n: number,
    updatedExisting: boolean
}
export interface FindOneAndUpdateReturnType<T, R = undefined>{
    lastErrorObject: R,
    value: T
}