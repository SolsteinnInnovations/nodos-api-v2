import mongoose, { Document } from 'mongoose';
interface IUser extends Document {
    username: string;
    email: string;
    emailValidated: boolean;
    password: string;
    img?: string;
    role: string[];
    estado: boolean;
    idSucursal?: mongoose.Schema.Types.ObjectId;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
