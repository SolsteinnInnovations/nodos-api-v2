"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const ClerkProvider_1 = require("../../providers/ClerkProvider");
const jwt_1 = require("../../middlewares/jwt");
const createLog_1 = require("../../helpers/createLog");
const logSeverity_enum_1 = require("../../enums/logSeverity.enum");
class AuthController {
    constructor() { }
    // Registro de usuarios
    // Inicio de sesión de usuarios
    loginUser = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Obtener el usuario desde Clerk
            const clerkUser = await ClerkProvider_1.ClerkProvider.validateUserClerk(email, password);
            // no se que onda pero funciona para tener la interfaz del usuario
            if (!("id" in clerkUser && "emailAddresses" in clerkUser)) {
                res.status(400).json({ message: "Error interface" });
                return;
            }
            const { publicMetadata, imageUrl = '' } = clerkUser;
            req.user = {
                imageUrl: imageUrl,
                id: clerkUser.id,
                email: publicMetadata.email,
                organizationId: publicMetadata.organizationId,
                username: publicMetadata.username,
                permisos: Array.isArray(publicMetadata.permisos) ? publicMetadata.permisos.join(",") : publicMetadata.permisos,
                sucursalId: publicMetadata.sucursalId,
            };
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `Usuario logueado correctamente: ${publicMetadata.username}`);
            const token = await (0, jwt_1.generateJWT)(req.user);
            res.status(200).json({
                userData: req.user,
                token
            });
        }
        catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ message: "Error logging in", error: error.message });
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map