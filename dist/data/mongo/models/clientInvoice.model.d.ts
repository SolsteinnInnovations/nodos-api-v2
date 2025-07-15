import mongoose from "mongoose";
export declare const clientInvoiceModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    items: any[];
    numeroFactura: string;
    metodosDePago: any[];
    estado?: boolean;
    fechaPago?: NativeDate;
    idSucursal?: mongoose.Types.ObjectId;
    cliente?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    items: any[];
    numeroFactura: string;
    metodosDePago: any[];
    estado?: boolean;
    fechaPago?: NativeDate;
    idSucursal?: mongoose.Types.ObjectId;
    cliente?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    items: any[];
    numeroFactura: string;
    metodosDePago: any[];
    estado?: boolean;
    fechaPago?: NativeDate;
    idSucursal?: mongoose.Types.ObjectId;
    cliente?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    items: any[];
    numeroFactura: string;
    metodosDePago: any[];
    estado?: boolean;
    fechaPago?: NativeDate;
    idSucursal?: mongoose.Types.ObjectId;
    cliente?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
