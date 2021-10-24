import mongoose, { Schema, model, Document } from "mongoose";

export interface ICity {
    _id: mongoose.Types.ObjectId
    classifierId: string,
    additionalInfo: string,
    externalRevision: number,
    name: string
}

const CitySchema = new Schema<ICity>({
    classifierId: {
        required: true,
        type: String
    },
    additionalInfo: {
        required: true,
        type: String
    },
    externalRevision: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    }
}, { versionKey: false });

export default model("City", CitySchema);