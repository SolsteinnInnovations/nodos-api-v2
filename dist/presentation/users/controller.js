"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("@clerk/express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../../data/mongo/models/user.model");
const ClerkProvider_1 = require("../../providers/ClerkProvider");
class UserController {
    constructor() { }
    registerUser = async (req, res) => {
        const { email, username, organizationId, sucursalId, permisos = [], } = req.body;
        // Validación básica
        if (!email || !username || !organizationId || !sucursalId) {
            res.status(400).json({ msg: "Faltan campos obligatorios." });
            return;
        }
        try {
            // Verificar si ya existe el email en MongoDB
            const emailExists = await user_model_1.UserModel.findOne({ email });
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
            const clerkUser = await ClerkProvider_1.ClerkProvider.createUserClerk(userData);
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
        }
        catch (error) {
            console.error("Error registrando usuario:", error);
            res.status(500).json({
                msg: "Error registrando usuario",
                error: error?.message || error,
            });
        }
    };
    updateUser = async (req, res) => {
        try {
            const { username } = req.params;
            const { name, email, password, ...rest } = req.body;
            const updateData = { ...rest };
            if (name)
                updateData.name = name.toLowerCase().trim();
            if (email) {
                const emailExists = await user_model_1.UserModel.findOne({
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
                const salt = await bcrypt_1.default.genSalt(10);
                updateData.password = await bcrypt_1.default.hash(password, salt);
            }
            const user = await user_model_1.UserModel.findOneAndUpdate({ username }, updateData, {
                new: true,
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            // Buscar usuario en Clerk por username
            const clerkUsersResponse = await express_1.clerkClient.users.getUserList({
                username: [username],
            });
            const clerkUsers = clerkUsersResponse.data;
            if (clerkUsers.length === 0) {
                res.status(404).json({ message: "User not found in Clerk" });
                return;
            }
            const clerkUser = clerkUsers[0];
            // Actualizar usuario en Clerk
            await express_1.clerkClient.users.updateUser(clerkUser.id, {
                username: updateData.username,
                firstName: updateData.name,
                password: updateData.password,
            });
            // Actualizar metadata en Clerk
            await express_1.clerkClient.users.updateUserMetadata(clerkUser.id, {
                privateMetadata: updateData.privateMetadata,
            });
            res.status(200).json({ user, msg: "Usuario actualizado correctamente" });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al actualizar el usuario", error });
        }
    };
    getClerkUsers = async (req, res) => {
        try {
            // Obtener la lista de usuarios de Clerk
            const usersResponse = await express_1.clerkClient.users.getUserList();
            const users = usersResponse.data;
            if (users.length === 0) {
                res.status(404).json({ message: "No hay usuarios en Clerk" });
                return;
            }
            // Crear un array para almacenar las membresías de cada usuario
            const usersWithMemberships = [];
            // Recorrer cada usuario y obtener sus membresías de organizaciones
            for (const user of users) {
                const membershipsResponse = await express_1.clerkClient.users.getOrganizationMembershipList({
                    userId: user.id,
                });
                usersWithMemberships.push({
                    user,
                    memberships: membershipsResponse.data,
                });
            }
            res.status(200).json({ users: usersWithMemberships });
        }
        catch (error) {
            console.error("Error obteniendo usuarios de Clerk:", error);
            res.status(500).json({ message: "Error al obtener los usuarios", error });
        }
    };
    getClerkUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await express_1.clerkClient.users.getUser(id);
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el usuario", error });
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map