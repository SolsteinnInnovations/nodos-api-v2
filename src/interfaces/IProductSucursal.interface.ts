import { Document } from "mongoose";
export interface IProductSucursal {
    stock: number;
    habilitado?: boolean;
    productoId: string; // ObjectId of Product
    precioCosto: number;
    precioVentaSucursal: number;
    sucursalId: string; // ObjectId of Sucursal
    organizacion: string; // Organization identifier
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProductSucursalDocument extends IProductSucursal, Document {}