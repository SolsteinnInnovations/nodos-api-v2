import { Document } from "mongoose";
export interface IProductSucursal {
    stock: number;
    habilitado?: boolean;
    productoId: string;
    precioCosto: number;
    precioVentaSucursal: number;
    sucursalId: string;
    organizacion: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IProductSucursalDocument extends IProductSucursal, Document {
}
