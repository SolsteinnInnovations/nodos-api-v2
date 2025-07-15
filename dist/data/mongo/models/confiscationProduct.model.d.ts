import mongoose from "mongoose";
export declare const confiscationProductModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    stock: number;
    sucursal: mongoose.Types.ObjectId;
    organizacion: string;
    nombre: string;
    descripcion: string;
    precioLista: number;
    precioVenta: number;
    poseeIva: boolean;
    iva: number;
    idProducto: string;
    cantidadDecomisada: number;
    motivoDescomiso: string;
    categoria?: mongoose.Types.ObjectId;
    usuario?: string;
    brand?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    stock: number;
    sucursal: mongoose.Types.ObjectId;
    organizacion: string;
    nombre: string;
    descripcion: string;
    precioLista: number;
    precioVenta: number;
    poseeIva: boolean;
    iva: number;
    idProducto: string;
    cantidadDecomisada: number;
    motivoDescomiso: string;
    categoria?: mongoose.Types.ObjectId;
    usuario?: string;
    brand?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    stock: number;
    sucursal: mongoose.Types.ObjectId;
    organizacion: string;
    nombre: string;
    descripcion: string;
    precioLista: number;
    precioVenta: number;
    poseeIva: boolean;
    iva: number;
    idProducto: string;
    cantidadDecomisada: number;
    motivoDescomiso: string;
    categoria?: mongoose.Types.ObjectId;
    usuario?: string;
    brand?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    stock: number;
    sucursal: mongoose.Types.ObjectId;
    organizacion: string;
    nombre: string;
    descripcion: string;
    precioLista: number;
    precioVenta: number;
    poseeIva: boolean;
    iva: number;
    idProducto: string;
    cantidadDecomisada: number;
    motivoDescomiso: string;
    categoria?: mongoose.Types.ObjectId;
    usuario?: string;
    brand?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
