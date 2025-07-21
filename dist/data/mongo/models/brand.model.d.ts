import mongoose from "mongoose";
export declare const BrandModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitado: boolean;
    nombre: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitado: boolean;
    nombre: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitado: boolean;
    nombre: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitado: boolean;
    nombre: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
