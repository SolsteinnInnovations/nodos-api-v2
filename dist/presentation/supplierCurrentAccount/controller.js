"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierCurrentAccountController = void 0;
const class_validator_1 = require("class-validator");
const supplierCurrentAccount_model_1 = require("./../../data/mongo/models/supplierCurrentAccount.model");
class SupplierCurrentAccountController {
    constructor() { }
    createSupplierCurrentAccount = async (req, res) => {
        try {
            const { importe, deudaTotal, factura, proveedor, ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const newSupplierCurrentAccount = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.create({
                importe,
                deudaTotal,
                factura,
                proveedor,
                organizacion: organizationId,
                ...rest,
            });
            res.status(200).json({
                msg: "Cuenta corriente del proveedor creada correctamente",
                newSupplierCurrentAccount
            });
            return;
        }
        catch (error) {
            console.error('Error creating supplier current account:', error);
            res.status(500).json({ message: "Error al crear la cuenta corriente del proveedor", error });
            return;
        }
    };
    getSupplierCurrentAccounts = async (req, res) => {
        try {
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const supplierCurrentAccounts = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.find({ organizacion: organizationId });
            res.status(200).json({ supplierCurrentAccounts });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener las cuentas corrientes de los proveedores", error });
        }
    };
    getSupplierCurrentAccountById = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            const supplierCurrentAccount = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.findById(id);
            if (!supplierCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del proveedor" });
                return;
            }
            // Validar que la organización coincida
            if (supplierCurrentAccount.organizacion.toString() !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para acceder a esta cuenta corriente" });
                return;
            }
            res.status(200).json({ supplierCurrentAccount });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la cuenta corriente del proveedor", error });
        }
    };
    updateSupplierCurrentAccount = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            // Buscar por id y organizacion
            const supplierCurrentAccount = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.findOne({ _id: id, organizacion: organizationId });
            if (!supplierCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del proveedor o no tienes permiso para actualizarla" });
                return;
            }
            const updatedSupplierCurrentAccount = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ updatedSupplierCurrentAccount });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la cuenta corriente del proveedor", error });
        }
    };
    deleteSupplierCurrentAccount = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            // Buscar y eliminar por id y organizacion
            const supplierCurrentAccount = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            if (!supplierCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del proveedor o no tienes permiso para eliminarla" });
                return;
            }
            res.status(200).json({ message: "Cuenta corriente del proveedor eliminada correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar la cuenta corriente del proveedor:", error);
            res.status(500).json({ message: "Error al eliminar la cuenta corriente del proveedor", error });
        }
    };
}
exports.SupplierCurrentAccountController = SupplierCurrentAccountController;
//# sourceMappingURL=controller.js.map