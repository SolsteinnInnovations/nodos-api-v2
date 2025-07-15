import {Request, Response } from "express";
import { ClerkProvider } from "../../providers/ClerkProvider";
import { UserModel } from "../../data/mongo/models/user.model";
import { generateJWT } from "../../middlewares/jwt";
import { createLog } from "../../helpers/createLog";
import { Severidad } from "../../enums/logSeverity.enum";
import { IClerkUserData } from "../../interfaces/IClerkUserData.interface";
import { IUser } from "../../interfaces/IUser.interface";

export class AuthController {

  constructor() { }

  // Registro de usuarios

  // Inicio de sesión de usuarios
  loginUser = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    try {
      // Obtener el usuario desde Clerk
      const clerkUser = await ClerkProvider.validateUserClerk(email, password);

      // no se que onda pero funciona para tener la interfaz del usuario
      if (!("id" in clerkUser && "emailAddresses" in clerkUser)) {
        res.status(400).json({ message: "Error interface" });
        return;
      }
 
      const {publicMetadata ,imageUrl = ''} = clerkUser;

      
      req.user = {
        imageUrl: imageUrl,
        id: clerkUser.id,
        email: publicMetadata.email as string,       
        organizationId: publicMetadata.organizationId as string,
        username: publicMetadata.username as string,
        permisos: Array.isArray(publicMetadata.permisos) ? publicMetadata.permisos.join(",") : publicMetadata.permisos as string,
        sucursalId: publicMetadata.sucursalId as string,
      } 
      
      createLog(Severidad.INFO,`Usuario logueado correctamente: ${publicMetadata.username}`)
     
      
      const token = await generateJWT(req.user);
      
      res.status(200).json({
        userData: req.user 
        ,token
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  }
}
