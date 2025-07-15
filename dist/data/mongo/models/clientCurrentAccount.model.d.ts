import mongoose from "mongoose";
export declare const clientCurrentAccountModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deudaTotal: number;
    organizacion?: string;
    estado?: boolean;
    importe?: number;
    factura?: string;
    fechaPago?: NativeDate;
    cliente?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deudaTotal: number;
    organizacion?: string;
    estado?: boolean;
    importe?: number;
    factura?: string;
    fechaPago?: NativeDate;
    cliente?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deudaTotal: number;
    organizacion?: string;
    estado?: boolean;
    importe?: number;
    factura?: string;
    fechaPago?: NativeDate;
    cliente?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deudaTotal: number;
    organizacion?: string;
    estado?: boolean;
    importe?: number;
    factura?: string;
    fechaPago?: NativeDate;
    cliente?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
