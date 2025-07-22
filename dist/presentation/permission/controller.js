"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const permission_model_1 = require("../../data/mongo/models/permission.model");
class PermissionController {
    constructor() { }
    createPermission = async (req, res) => {
        try {
            const permission = req.body;
            const newPermission = await permission_model_1.PermissionModel.create({
                ...permission,
            });
            res.status(200).json({ msg: "Permiso creado correctamente", newPermission });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear el permiso", error });
        }
    };
    getPermissions = async (req, res) => {
        try {
            const permissions = await permission_model_1.PermissionModel.find({});
            res.status(200).json({ permissions });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los permisos", error });
        }
    };
    getPermission = async (req, res) => {
        const { id } = req.params;
        try {
            const permission = await permission_model_1.PermissionModel.findOne({ _id: id });
            if (!permission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ permission });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el permiso", error });
        }
    };
    updatePermission = async (req, res) => {
        const { id } = req.params;
        try {
            const updatedPermission = await permission_model_1.PermissionModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
            if (!updatedPermission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Permiso actualizado correctamente", updatedPermission });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el permiso", error });
        }
    };
    deletePermission = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedPermission = await permission_model_1.PermissionModel.findOneAndDelete({ _id: id });
            if (!deletedPermission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Permiso eliminado correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el permiso", error });
        }
    };
}
exports.PermissionController = PermissionController;
//# sourceMappingURL=controller.js.map