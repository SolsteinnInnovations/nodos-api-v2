import mongoose from "mongoose";
export declare const ReturnsModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    idSucursal: mongoose.Types.ObjectId;
    cantidad: number;
    idProducto: mongoose.Types.ObjectId;
    observaciones?: string;
    precio?: number;
    idFacturaProveedor?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    idSucursal: mongoose.Types.ObjectId;
    cantidad: number;
    idProducto: mongoose.Types.ObjectId;
    observaciones?: string;
    precio?: number;
    idFacturaProveedor?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    idSucursal: mongoose.Types.ObjectId;
    cantidad: number;
    idProducto: mongoose.Types.ObjectId;
    observaciones?: string;
    precio?: number;
    idFacturaProveedor?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    idSucursal: mongoose.Types.ObjectId;
    cantidad: number;
    idProducto: mongoose.Types.ObjectId;
    observaciones?: string;
    precio?: number;
    idFacturaProveedor?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
