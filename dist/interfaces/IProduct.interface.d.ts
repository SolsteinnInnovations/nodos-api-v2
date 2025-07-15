import { Sucursal } from "./ISucursal.interface";
export interface IProduct {
    codigo: string;
    nombre: string;
    descripcion?: string;
    stock: number;
    precioLista: number;
    precioVenta: number;
    poseeIva: boolean;
    iva?: number;
    categoria: string;
    marca: string;
    organizacion: string;
    sucursales?: Sucursal[];
}
export interface IProductInvalid extends Pick<IProduct, 'codigo' | 'nombre' | 'categoria' | 'marca'> {
    msg: string;
}
