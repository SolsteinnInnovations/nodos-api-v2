import { IProduct } from "../interfaces/IProduct.interface";
export declare const validateAndFormatProducts: (organizationId: string, products: IProduct[]) => Promise<{
    validProducts: IProduct[];
    errors: string[];
}>;
