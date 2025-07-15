import { Request } from "express";
export interface IUser extends Request {
    userId?: string;
    username?: string;
    email?: string;
    role?: string;
    organizationId?: string;
    tipoUsuario: 'User' | "Admin";
    sucursalId: string;
    isActive?: boolean;
    permisos?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    password?: string;
}
declare global {
    namespace Express {
        interface User {
            email: string;
            permisos: string;
            username: string;
            sucursalId: string;
            organizationId: string;
            userId?: string;
            imageUrl?: string;
            role?: string;
            id: string;
            isActive?: boolean;
            createdAt?: Date;
            updatedAt?: Date;
            password?: string;
        }
        interface Request {
            user: User;
        }
    }
}
