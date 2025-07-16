import mongoose from "mongoose";
export declare const ClientModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    emailValidated: boolean;
    estado: boolean;
    nombre: string;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    fechaNacimiento?: NativeDate;
    cuitCuil?: string;
    localidad?: string;
    provincia?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    emailValidated: boolean;
    estado: boolean;
    nombre: string;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    fechaNacimiento?: NativeDate;
    cuitCuil?: string;
    localidad?: string;
    provincia?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    emailValidated: boolean;
    estado: boolean;
    nombre: string;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    fechaNacimiento?: NativeDate;
    cuitCuil?: string;
    localidad?: string;
    provincia?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    emailValidated: boolean;
    estado: boolean;
    nombre: string;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    fechaNacimiento?: NativeDate;
    cuitCuil?: string;
    localidad?: string;
    provincia?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
