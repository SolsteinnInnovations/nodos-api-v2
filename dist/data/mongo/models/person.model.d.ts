import mongoose from "mongoose";
export declare const PersonModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    fechaNacimiento: NativeDate;
    dni: string;
    estado?: boolean;
    fechaIngreso?: NativeDate;
    cargo?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    fechaNacimiento: NativeDate;
    dni: string;
    estado?: boolean;
    fechaIngreso?: NativeDate;
    cargo?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    fechaNacimiento: NativeDate;
    dni: string;
    estado?: boolean;
    fechaIngreso?: NativeDate;
    cargo?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    organizacion: string;
    email: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    telefono: string;
    fechaNacimiento: NativeDate;
    dni: string;
    estado?: boolean;
    fechaIngreso?: NativeDate;
    cargo?: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
