import mongoose from "mongoose";
import { IProduct } from "../../../interfaces/IProduct.interface";
export declare const ProductModel: mongoose.Model<IProduct & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IProduct & mongoose.Document<unknown, any, any>> & IProduct & mongoose.Document<unknown, any, any> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
