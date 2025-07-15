"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitController = void 0;
const kit_model_1 = require("../../data/mongo/models/kit.model");
class KitController {
    // Crear un nuevo kit
    createKit = async (req, res) => {
        try {
            const { nombre, descripcion, precioVenta, iva, items } = req.body;
            const { organizationId } = req.user;
            // Verificación si el kit ya existe
            const existingKit = await kit_model_1.KitModel.findOne({
                nombre,
                organizacion: organizationId,
            });
            if (existingKit) {
                res.status(400).json({ msg: "El kit ya existe" });
                return;
            }
            const newKit = await kit_model_1.KitModel.create({
                nombre,
                descripcion,
                precioVenta,
                iva,
                items,
                organizacion: organizationId,
            });
            res.status(201).json({
                msg: "Kit creado correctamente",
                newKit,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear el kit", error });
        }
    };
    // Obtener todos los kits
    getKits = async (req, res) => {
        try {
            const { organizationId } = req.user;
            const kits = await kit_model_1.KitModel.find({ organizacion: organizationId });
            if (!kits || kits.length === 0) {
                res.status(404).json({ msg: "No se encontraron kits" });
                return;
            }
            res.status(200).json({ kits });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los kits", error });
        }
    };
    // Obtener un kit por ID
    getKit = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const kit = await kit_model_1.KitModel.findOne({ _id: id, organizacion: organizationId });
            if (!kit) {
                res.status(404).json({ msg: "Kit no encontrado" });
                return;
            }
            res.status(200).json({ kit });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el kit", error });
        }
    };
    // Actualizar un kit
    updateKit = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const updateData = req.body;
            // Verificar si el kit existe y pertenece a la organización
            const kit = await kit_model_1.KitModel.findOne({ _id: id, organizacion: organizationId });
            if (!kit) {
                res.status(404).json({ msg: "Kit no encontrado" });
                return;
            }
            const updatedKit = await kit_model_1.KitModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            res.status(200).json({
                msg: "Kit actualizado correctamente",
                updatedKit,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el kit", error });
        }
    };
    // Eliminar un kit
    deleteKit = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            // Verificar si el kit existe y pertenece a la organización
            const kit = await kit_model_1.KitModel.findOne({ _id: id, organizacion: organizationId });
            if (!kit) {
                res.status(404).json({ msg: "Kit no encontrado" });
                return;
            }
            await kit_model_1.KitModel.deleteOne({ _id: id, organizacion: organizationId });
            res.status(200).json({ msg: "Kit eliminado correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el kit", error });
        }
    };
}
exports.KitController = KitController;
//# sourceMappingURL=controller.js.map