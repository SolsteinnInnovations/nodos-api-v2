import mongoose from "mongoose";
export declare const SucursalModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitadoParaVender: boolean;
    direccion: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitadoParaVender: boolean;
    direccion: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitadoParaVender: boolean;
    direccion: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    descripcion: string;
    habilitadoParaVender: boolean;
    direccion: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
