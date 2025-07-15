import mongoose from "mongoose";
export declare const OrganizationModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    createdBy: string;
    maxAllowedMemberships: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    createdBy: string;
    maxAllowedMemberships: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    createdBy: string;
    maxAllowedMemberships: number;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    slug: string;
    createdBy: string;
    maxAllowedMemberships: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, any>;
