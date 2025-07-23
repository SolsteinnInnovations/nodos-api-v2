import mongoose from "mongoose";
export declare const PermissionModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    descripcion: string;
    nombre: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    descripcion: string;
    nombre: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    descripcion: string;
    nombre: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    descripcion: string;
    nombre: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
