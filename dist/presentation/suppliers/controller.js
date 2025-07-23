"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const class_validator_1 = require("class-validator");
const supplier_model_1 = require("../../data/mongo/models/supplier.model");
class SupplierController {
    // Crear un nuevo proveedor
    createSupplier = async (req, res) => {
        try {
            const { razonSocial, cuit, ...rest } = req.body;
            const newRazonSocial = razonSocial.toLowerCase().trim();
            const cuitExists = await supplier_model_1.SupplierModel.findOne({ cuit });
            // Obtener organizationId del usuario
            const { organizationId } = req.user;
            if (cuitExists) {
                res.status(400).json({ msg: "El proveedor con este CUIT ya existe" });
                return;
            }
            const newSupplier = await supplier_model_1.SupplierModel.create({
                razonSocial: newRazonSocial,
                cuit,
                organizacion: organizationId, // Asignar organizationId del usuario
                ...rest,
            });
            res.status(200).json({
                msg: "Proveedor creado correctamente",
                newSupplier,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear el proveedor", error });
        }
    };
    // Obtener todos los proveedores
    getSuppliers = async (req, res) => {
        try {
            const { organizationId } = req.user;
            // Filtrar proveedores por organización
            const suppliers = await supplier_model_1.SupplierModel.find({ organizacion: organizationId });
            res.status(200).json({ suppliers });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los proveedores", error });
        }
    };
    // Obtener un proveedor por ID o término
    getSupplier = async (req, res) => {
        try {
            const { term } = req.params;
            const { organizationId } = req.user;
            let query;
            if ((0, class_validator_1.isMongoId)(term)) {
                query = { _id: term, organizacion: organizationId };
            }
            else if (!isNaN(Number(term))) {
                query = { cuit: term, organizacion: organizationId };
            }
            else {
                query = { razonSocial: { $regex: new RegExp(term, "i") }, organizacion: organizationId };
            }
            const supplier = await supplier_model_1.SupplierModel.findOne(query);
            if (!supplier) {
                res.status(404).json({ msg: "Proveedor no encontrado" });
                return;
            }
            res.status(200).json({ supplier });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el proveedor", error });
        }
    };
    // Actualizar un proveedor
    updateSupplier = async (req, res) => {
        try {
            const { id } = req.params;
            const { razonSocial, ...rest } = req.body;
            const { organizationId } = req.user;
            const updateData = { ...rest };
            if (razonSocial) {
                updateData.razonSocial = razonSocial.trim();
            }
            // Verificar si el proveedor existe y pertenece a la organización
            const supplier = await supplier_model_1.SupplierModel.findOne({ _id: id, organizacion: organizationId });
            if (!supplier) {
                res.status(404).json({ message: "Proveedor no encontrado" });
                return;
            }
            const updatedSupplier = await supplier_model_1.SupplierModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            res.status(200).json({ msg: "Proveedor actualizado correctamente", supplier: updatedSupplier });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el proveedor", error });
        }
    };
    // Eliminar un proveedor
    deleteSupplier = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const supplier = await supplier_model_1.SupplierModel.findOne({ _id: id, organizacion: organizationId });
            if (!supplier) {
                res.status(404).json({ message: "Proveedor no encontrado" });
                return;
            }
            await supplier_model_1.SupplierModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            res.status(200).json({ msg: "Proveedor eliminado correctamente", supplier });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el proveedor", error });
        }
    };
}
exports.SupplierController = SupplierController;
//# sourceMappingURL=controller.js.map