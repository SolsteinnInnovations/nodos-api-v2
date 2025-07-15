import mongoose from 'mongoose';
export declare const SupplierModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    email: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    telefono: string;
    domicilio: string;
    localidad: string;
    InicioActividades?: NativeDate;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    email: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    telefono: string;
    domicilio: string;
    localidad: string;
    InicioActividades?: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    email: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    telefono: string;
    domicilio: string;
    localidad: string;
    InicioActividades?: NativeDate;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    estado: boolean;
    email: string;
    razonSocial: string;
    IVA: string;
    cuit: string;
    telefono: string;
    domicilio: string;
    localidad: string;
    InicioActividades?: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
