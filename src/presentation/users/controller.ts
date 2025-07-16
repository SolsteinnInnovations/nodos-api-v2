import { Request, Response } from "express";
import { clerkClient } from "@clerk/express";
import bcrypt from 'bcrypt';
import { UserModel } from "../../data/mongo/models/user.model";
import { IUser } from "../../interfaces/IClerkUserData.interface";
import { ClerkProvider } from "../../providers/ClerkProvider";

export class UserController {
  constructor() { }
  registerUser = async (req: Request, res: Response): Promise<void> => {
    const {
      email,
      username,
      organizationId,
      sucursalId,
      permisos = [],
    } = req.body as IUser;

    // Validación básica
    if (!email  || !username  || !organizationId || !sucursalId) {
      res.status(400).json({ msg: "Faltan campos obligatorios." });
      return;
    }

    try {
      // Verificar si ya existe el email en MongoDB
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        res.status(400).json({ msg: "El email ya se encuentra en uso" });
        return;
      }

      // Crear el usuario en Clerk
      const userData = {
        organizationId,
        email,
        permisos,
        username,
        name: username, // O cualquier valor que represente el nombre completo
        sucursalId,
        emailAddress: [email],
        publicMetadata: {
          email,
          username,
          permisos,
          organizationId,
          sucursalId,
        },
        privateMetadata: {
          email,
          username,
          permisos,
          organizationId,
          sucursalId,
        },
      };

      const clerkUser = await ClerkProvider.createUserClerk(userData);

      // Asignar rol en la organización si es necesario


      // await ClerkProvider.createMembership({
      //   organizationId,
      //   userId: clerkUser.id,
      //   role: orgRole,
      // });

      res.status(201).json({
        msg: "Usuario creado correctamente en Clerk",
        userId: clerkUser.id,
      });
    } catch (error: any) {
      console.error("Error registrando usuario:", error);
      res.status(500).json({
        msg: "Error registrando usuario",
        error: error?.message || error,
      });
    }
  };

  // postUser = async (req: Request, res: Response) => {
  //   try {

  //     const { organizationId } = req.user;

  //     // if(usuario[0] !== 'Admin' || !organizationId)   { 
  //     //   res.status(400).json({ message: "User must be Admin or have and organizationId" });
  //     //   return
  //     // }

  //     const formData = req.body as IUser
  //     const clerkUser = {
  //       ...formData,
  //       organizationId
  //     }

  //     // await ClerkProvider.createUserClerk(clerkUser);

  //     res.status(200).json({ clerkUser });
  //     return;
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  // getUser = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const user = await UserModel.findById(id);
  //     if (!user) {
  //       res.status(404).json({ message: "User not found" });
  //       return;
  //     }
  //     res.status(200).json({ user });
  //   } catch (error) {
  //     res.status(500).json({ message: "Error al obtener el usuario", error });
  //   }
  // };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const { name, email, password, ...rest } = req.body;

      const updateData: any = { ...rest };

      if (name) updateData.name = name.toLowerCase().trim();

      if (email) {
        const emailExists = await UserModel.findOne({
          email: email.toLowerCase().trim(),
          username: { $ne: username },
        });
        if (emailExists) {
          res.status(400).json({ message: "El email ya está en uso" });
          return;
        }
        updateData.email = email.toLowerCase().trim();
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findOneAndUpdate({ username }, updateData, {
        new: true,
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Buscar usuario en Clerk por username
      const clerkUsersResponse = await clerkClient.users.getUserList({ username: [username] });
      const clerkUsers = clerkUsersResponse.data;
      if (clerkUsers.length === 0) {
        res.status(404).json({ message: "User not found in Clerk" });
        return;
      }
      const clerkUser = clerkUsers[0];

      // Actualizar usuario en Clerk
      await clerkClient.users.updateUser(clerkUser.id, {
        username: updateData.username,
        firstName: updateData.name,
        password: updateData.password
      });

      // Actualizar metadata en Clerk
      await clerkClient.users.updateUserMetadata(clerkUser.id, {
        privateMetadata: updateData.privateMetadata,
      });

      res.status(200).json({ user, msg: "Usuario actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
  };

  // getUsers = async (req: Request, res: Response) => {
  //   try {
  //     const users = await UserModel.find();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching users', error: error });
  //   }
  // }

  getClerkUsers = async (req: Request, res: Response) => {
    try {
      // Obtener la lista de usuarios de Clerk
      const usersResponse = await clerkClient.users.getUserList();
      const users = usersResponse.data;

      if (users.length === 0) {
        res.status(404).json({ message: "No hay usuarios en Clerk" });
        return;
      }

      // Crear un array para almacenar las membresías de cada usuario
      const usersWithMemberships = [];

      // Recorrer cada usuario y obtener sus membresías de organizaciones
      for (const user of users) {
        const membershipsResponse = await clerkClient.users.getOrganizationMembershipList({ userId: user.id });
        usersWithMemberships.push({
          user,
          memberships: membershipsResponse.data
        });
      }

      res.status(200).json({ users: usersWithMemberships });
    } catch (error) {
      console.error("Error obteniendo usuarios de Clerk:", error);
      res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
  };


  getClerkUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await clerkClient.users.getUser(id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      // Eliminar usuario de MongoDB
      const user = await UserModel.findOneAndDelete({ username: username.toLowerCase().trim() });
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado en MongoDB" });
        return;
      }

      // Buscar usuario en Clerk
      const clerkUser = await clerkClient.users.getUserList({ username: [username] });

      if (!clerkUser || clerkUser.data.length === 0) {
        res.status(404).json({ message: "Usuario no encontrado en Clerk" });
        return;
      }

      // Eliminar usuario en Clerk
      await clerkClient.users.deleteUser(clerkUser.data[0].id);

      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
  };






}
