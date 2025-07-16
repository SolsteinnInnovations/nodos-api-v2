import mongoose from "mongoose";
export declare const clientInvoiceModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    numeroFactura: string;
    metodosDePago: any[];
    items: any[];
    estado?: boolean;
    idSucursal?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    fechaPago?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
    cliente?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    numeroFactura: string;
    metodosDePago: any[];
    items: any[];
    estado?: boolean;
    idSucursal?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    fechaPago?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
    cliente?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    numeroFactura: string;
    metodosDePago: any[];
    items: any[];
    estado?: boolean;
    idSucursal?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    fechaPago?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
    cliente?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    numeroFactura: string;
    metodosDePago: any[];
    items: any[];
    estado?: boolean;
    idSucursal?: mongoose.Types.ObjectId;
    detalles?: string;
    descuento?: number;
    recargo?: number;
    subtotal?: number;
    total?: number;
    tipoFactura?: string;
    condicionIva?: string;
    fecha?: NativeDate;
    fechaPago?: NativeDate;
    caja?: mongoose.Types.ObjectId;
    usuario?: string;
    cliente?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
