"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkProvider = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const clerk_mapper_1 = require("../mappers/clerk.mapper");
class ClerkProvider {
    constructor() { }
    static validateUserClerk = async (email, password) => {
        // validamos si el email existe en clerk
        try {
            const clerkUserArray = await clerk_sdk_node_1.clerkClient.users.getUserList({
                emailAddress: [email],
            });
            const clerkUser = clerkUserArray[0];
            if (!clerkUser) {
                throw new Error('El usuario no existe en clerk');
            }
            // validamos si esta bloqueado o baneado sacaron el lock, asi que habria que banear
            if (clerkUser.banned) {
                throw new Error('El usuario esta bloqueado o baneado en clerk');
            }
            await clerk_sdk_node_1.clerkClient.users.verifyPassword({
                userId: clerkUser.id,
                password
            });
            return clerkUser;
        }
        catch (error) {
            console.error("Error al validar el usuario en Clerk:", error.message);
            throw new Error(error);
        }
    };
    static createUserClerk = async (clerkUserData) => {
        try {
            const dto = (0, clerk_mapper_1.toClerkUserDTO)(clerkUserData);
            const newClerkUser = await clerk_sdk_node_1.clerkClient.users.createUser(dto);
            return newClerkUser;
        }
        catch (error) {
            throw new Error(error);
        }
    };
    static getOrganizationClerk = async (organizationId) => {
        try {
            const organization = await clerk_sdk_node_1.clerkClient.organizations.getOrganization({ organizationId });
            return organization;
        }
        catch (error) {
            console.error("Error al obtener la organización de Clerk:", error.message);
            throw new Error(error);
        }
    };
}
exports.ClerkProvider = ClerkProvider;
//# sourceMappingURL=ClerkProvider.js.map