import { Request, Response } from "express";
import { PermissionModel } from "../../data/mongo/models/permission.model";
import mongoose from 'mongoose';
export class PermissionController {
    constructor() {}

    createPermission = async (req: Request, res: Response) => {
        try {
            const permission = req.body;
            const newPermission = await PermissionModel.create({
                ...permission,          
            });
            res.status(200).json({ msg: "Permiso creado correctamente", newPermission });
        } catch (error) {
            res.status(500).json({ message: "Error al crear el permiso", error });
        }
    }

    getPermissions = async (req: Request, res: Response) => {
        try {
            const permissions = await PermissionModel.find({});
            res.status(200).json({ permissions });
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los permisos", error });
        }
    };

    getPermission = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const permission = await PermissionModel.findOne({ _id: id });
            if (!permission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ permission });
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el permiso", error });
        }
    };

    updatePermission = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const updatedPermission = await PermissionModel.findOneAndUpdate(
                { _id: id },
                req.body,
                { new: true }
            );
            if (!updatedPermission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Permiso actualizado correctamente", updatedPermission });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el permiso", error });
        }
    };

    deletePermission = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const deletedPermission = await PermissionModel.findOneAndDelete({ _id: id });
            if (!deletedPermission) {
                res.status(404).json({ message: "Permiso no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Permiso eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el permiso", error });
        }
    };
}