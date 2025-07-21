import mongoose from "mongoose";
export declare const DailyCashModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    importeInicioCaja: number;
    estado: boolean;
    fechaHoraInicio: NativeDate;
    organizacion: string;
    idSucursal?: mongoose.Types.ObjectId;
    fechaHoraCierre?: NativeDate;
    idUsuario?: string;
    observaciones?: string;
    validacionTotalEfectivo?: number;
    importeCierreCaja?: number;
    totalVentas?: number;
    totalProductosVendidos?: number;
    totalGastos?: number;
    transacciones?: any[];
    totalCaja?: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    importeInicioCaja: number;
    estado: boolean;
    fechaHoraInicio: NativeDate;
    organizacion: string;
    idSucursal?: mongoose.Types.ObjectId;
    fechaHoraCierre?: NativeDate;
    idUsuario?: string;
    observaciones?: string;
    validacionTotalEfectivo?: number;
    importeCierreCaja?: number;
    totalVentas?: number;
    totalProductosVendidos?: number;
    totalGastos?: number;
    transacciones?: any[];
    totalCaja?: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    importeInicioCaja: number;
    estado: boolean;
    fechaHoraInicio: NativeDate;
    organizacion: string;
    idSucursal?: mongoose.Types.ObjectId;
    fechaHoraCierre?: NativeDate;
    idUsuario?: string;
    observaciones?: string;
    validacionTotalEfectivo?: number;
    importeCierreCaja?: number;
    totalVentas?: number;
    totalProductosVendidos?: number;
    totalGastos?: number;
    transacciones?: any[];
    totalCaja?: number;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    importeInicioCaja: number;
    estado: boolean;
    fechaHoraInicio: NativeDate;
    organizacion: string;
    idSucursal?: mongoose.Types.ObjectId;
    fechaHoraCierre?: NativeDate;
    idUsuario?: string;
    observaciones?: string;
    validacionTotalEfectivo?: number;
    importeCierreCaja?: number;
    totalVentas?: number;
    totalProductosVendidos?: number;
    totalGastos?: number;
    transacciones?: any[];
    totalCaja?: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
