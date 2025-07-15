import mongoose from "mongoose";
export declare const ClientModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    estado: boolean;
    emailValidated: boolean;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    localidad?: string;
    cuitCuil?: string;
    provincia?: string;
    fechaNacimiento?: NativeDate;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    estado: boolean;
    emailValidated: boolean;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    localidad?: string;
    cuitCuil?: string;
    provincia?: string;
    fechaNacimiento?: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    estado: boolean;
    emailValidated: boolean;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    localidad?: string;
    cuitCuil?: string;
    provincia?: string;
    fechaNacimiento?: NativeDate;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    estado: boolean;
    emailValidated: boolean;
    apellido: string;
    organizacion?: string;
    email?: string;
    telefono?: string;
    domicilio?: string;
    localidad?: string;
    cuitCuil?: string;
    provincia?: string;
    fechaNacimiento?: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
