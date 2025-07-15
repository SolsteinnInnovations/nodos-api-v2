import { Document, Types } from "mongoose";
export interface ITransaccion {
    tipo: string;
    monto: number;
    descripcion?: string;
}
export interface IDailyCash extends Document {
    importeInicioCaja: number;
    estado: boolean;
    idSucursal?: Types.ObjectId;
    fechaHoraInicio: Date;
    fechaHoraCierre?: Date;
    idUsuario?: string;
    observaciones?: string;
    validacionTotalEfectivo?: number;
    importeCierreCaja?: number;
    metodosDePago?: any[];
    totalVentas?: number;
    totalProductosVendidos?: number;
    totalGastos?: number;
    organizacion: string;
    transacciones?: ITransaccion[];
    createdAt: Date;
    updatedAt: Date;
    totalCaja?: number;
}
