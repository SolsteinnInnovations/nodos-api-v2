"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCurrentAccountController = void 0;
const class_validator_1 = require("class-validator");
const clientCurrentAccount_model_1 = require("../../data/mongo/models/clientCurrentAccount.model");
class ClientCurrentAccountController {
    constructor() { }
    createClientCurrentAccount = async (req, res) => {
        try {
            const { importe, deudaTotal, factura, cliente, ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const newClientCurrentAccount = await clientCurrentAccount_model_1.clientCurrentAccountModel.create({
                importe,
                deudaTotal,
                factura,
                cliente,
                organizacion: organizationId,
                ...rest,
            });
            res.status(200).json({
                msg: "Cuenta corriente del cliente creada correctamente",
                newClientCurrentAccount
            });
            return;
        }
        catch (error) {
            console.error('Error creating client current account:', error);
            res.status(500).json({ message: "Error al crear la cuenta corriente del cliente", error });
            return;
        }
    };
    getClientCurrentAccounts = async (req, res) => {
        try {
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            const clientCurrentAccounts = await clientCurrentAccount_model_1.clientCurrentAccountModel.find({ organizacion: organizationId });
            res.status(200).json({ clientCurrentAccounts });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener las cuentas corrientes de los clientes", error });
        }
    };
    getClientCurrentAccountById = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            const clientCurrentAccount = await clientCurrentAccount_model_1.clientCurrentAccountModel.findById(id);
            if (!clientCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del cliente" });
                return;
            }
            // Validar que la organización coincida
            if (clientCurrentAccount.organizacion.toString() !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para acceder a esta cuenta corriente" });
                return;
            }
            res.status(200).json({ clientCurrentAccount });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la cuenta corriente del cliente", error });
        }
    };
    updateClientCurrentAccount = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            // Buscar por id y organizacion
            const clientCurrentAccount = await clientCurrentAccount_model_1.clientCurrentAccountModel.findOne({ _id: id, organizacion: organizationId });
            if (!clientCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del cliente o no tienes permiso para actualizarla" });
                return;
            }
            const updatedClientCurrentAccount = await clientCurrentAccount_model_1.clientCurrentAccountModel.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ updatedClientCurrentAccount });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la cuenta corriente del cliente", error });
        }
    };
    deleteClientCurrentAccount = async (req, res) => {
        const { id } = req.params;
        const { organizationId } = req.user; // Obtener organizationId del usuario logueado
        if (!(0, class_validator_1.isMongoId)(id)) {
            res.status(400).json({ message: "El id no es válido" });
            return;
        }
        try {
            // Buscar y eliminar por id y organizacion
            const clientCurrentAccount = await clientCurrentAccount_model_1.clientCurrentAccountModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            if (!clientCurrentAccount) {
                res.status(404).json({ message: "No se encontró la cuenta corriente del cliente o no tienes permiso para eliminarla" });
                return;
            }
            res.status(200).json({ message: "Cuenta corriente del cliente eliminada correctamente" });
        }
        catch (error) {
            console.error("Error al eliminar la cuenta corriente del cliente:", error);
            res.status(500).json({ message: "Error al eliminar la cuenta corriente del cliente", error });
        }
    };
}
exports.ClientCurrentAccountController = ClientCurrentAccountController;
//# sourceMappingURL=controller.js.map