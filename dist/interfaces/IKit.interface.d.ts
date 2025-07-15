export interface IKit {
    nombre: string;
    descripcion: string;
    precioVenta: number;
    iva?: number;
    items: Array<{
        codigo: string;
        cantidad: number;
    }>;
    organizacion: string;
}
