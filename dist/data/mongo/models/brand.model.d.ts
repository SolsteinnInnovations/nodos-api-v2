import mongoose from "mongoose";
export declare const BrandModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    estado: boolean;
    nombre: string;
    descripcion: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    estado: boolean;
    nombre: string;
    descripcion: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    estado: boolean;
    nombre: string;
    descripcion: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    habilitado: boolean;
    organizacion: string;
    estado: boolean;
    nombre: string;
    descripcion: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
