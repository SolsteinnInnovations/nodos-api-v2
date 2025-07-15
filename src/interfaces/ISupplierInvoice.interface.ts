import mongoose from 'mongoose';

export interface ISupplierInvoice {
    idProveedor: mongoose.Types.ObjectId;
    estado: boolean;
    fechaPago?: Date;
    numeroFactura: string;
    cantidadTotal: number;
    importe: number;
    fechaFactura: Date;
    items: any[]; // Puedes definir un esquema más detallado para esto
    metodosDePago?: any[];
    idSucursal: mongoose.Types.ObjectId;
    organizacion: string;
    createdAt?: Date;
    updatedAt?: Date;
}