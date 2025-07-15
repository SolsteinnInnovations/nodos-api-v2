import { PassThrough } from "stream";
interface PDFData {
    nombre: string;
    cuitCuil: string;
    domicilio: string;
    fecha: string;
    items: {
        producto: string;
        cantidad: number;
        precioUnitario: number;
    }[];
    subtotal: number;
    total: number;
    iva?: number;
}
export declare const generatePDF: (data: PDFData) => PassThrough;
export {};
