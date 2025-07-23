import mongoose from 'mongoose';
export declare const SupplierModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    email: string;
    domicilio: string;
    telefono: string;
    localidad: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    InicioActividades?: NativeDate;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    email: string;
    domicilio: string;
    telefono: string;
    localidad: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    InicioActividades?: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    email: string;
    domicilio: string;
    telefono: string;
    localidad: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    InicioActividades?: NativeDate;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: boolean;
    organizacion: string;
    email: string;
    domicilio: string;
    telefono: string;
    localidad: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    InicioActividades?: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
