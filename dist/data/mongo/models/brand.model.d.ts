import mongoose from "mongoose";
export declare const BrandModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    nombre: string;
    descripcion: string;
    estado: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
