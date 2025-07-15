import mongoose from "mongoose";
export declare const SupplierInvoiceModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    importe: number;
    idSucursal: mongoose.Types.ObjectId;
    items: any[];
    numeroFactura: string;
    idProveedor: mongoose.Types.ObjectId;
    cantidadTotal: number;
    fechaFactura: NativeDate;
    fechaPago?: NativeDate;
    metodosDePago?: any[];
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    importe: number;
    idSucursal: mongoose.Types.ObjectId;
    items: any[];
    numeroFactura: string;
    idProveedor: mongoose.Types.ObjectId;
    cantidadTotal: number;
    fechaFactura: NativeDate;
    fechaPago?: NativeDate;
    metodosDePago?: any[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    importe: number;
    idSucursal: mongoose.Types.ObjectId;
    items: any[];
    numeroFactura: string;
    idProveedor: mongoose.Types.ObjectId;
    cantidadTotal: number;
    fechaFactura: NativeDate;
    fechaPago?: NativeDate;
    metodosDePago?: any[];
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    importe: number;
    idSucursal: mongoose.Types.ObjectId;
    items: any[];
    numeroFactura: string;
    idProveedor: mongoose.Types.ObjectId;
    cantidadTotal: number;
    fechaFactura: NativeDate;
    fechaPago?: NativeDate;
    metodosDePago?: any[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
