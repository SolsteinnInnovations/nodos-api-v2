import { Request } from "express";

export interface IUser  extends Request {
    userId?: string;
    username?: string;
    email?: string;
    role?: string;
    organizationId?: string;
    tipoUsuario: 'User' | "Admin"; // e.g., "Administrador", "Usuario", etc.
    sucursalId: string;
    isActive?: boolean;
    permisos?: string[]; // Optional, if you want to include permissions
    createdAt?: Date;
    updatedAt?: Date;
    password?: string; // Optional, if you want to include it in the interface
}

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface User {
      email: string;
      permisos: string;
      username: string;
      sucursalId: string;      // p.e. ['Administrador', 'Cajero']
      organizationId: string;
         userId?: string;
    imageUrl?: string; // Optional, if you want to include the user's image URL
    role?: string;
   id: string;
    isActive?: boolean;
     // Optional, if you want to include permissions
    createdAt?: Date;
    updatedAt?: Date;
    password?: string; // Optional, if you want to include it in the interface
      // agrega aquí otras propiedades si es necesario
    }
    interface Request {
      user: User;
    }
  }
}