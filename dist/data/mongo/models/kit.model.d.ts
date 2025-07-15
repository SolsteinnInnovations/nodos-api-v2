import mongoose from "mongoose";
import { IKit } from "../../../interfaces/IKit.interface";
export declare const KitModel: mongoose.Model<IKit & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, IKit & mongoose.Document<unknown, any, any>> & IKit & mongoose.Document<unknown, any, any> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
