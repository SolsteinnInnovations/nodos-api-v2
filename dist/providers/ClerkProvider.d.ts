import { IClerkUserData } from "../interfaces/IClerkUserData.interface";
export declare class ClerkProvider {
    constructor();
    static validateUserClerk: (email: string, password: string) => Promise<import("@clerk/clerk-sdk-node").User>;
    static createUserClerk: (clerkUserData: IClerkUserData) => Promise<import("@clerk/clerk-sdk-node").User>;
    static getOrganizationClerk: (organizationId: string) => Promise<import("@clerk/clerk-sdk-node").Organization>;
}
