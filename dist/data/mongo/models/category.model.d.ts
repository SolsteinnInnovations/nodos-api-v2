import mongoose from "mongoose";
export declare const CategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    nombre: string;
    descripcion?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    strict: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    nombre: string;
    descripcion?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    nombre: string;
    descripcion?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    nombre: string;
    descripcion?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
