"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceController = void 0;
const supplierInvoice_model_1 = require("../../data/mongo/models/supplierInvoice.model");
const mongoose_1 = __importDefault(require("mongoose"));
class SupplierInvoiceController {
    // Crear una nueva factura de proveedor
    createSupplierInvoice = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user;
            const { idProveedor, numeroFactura, ...rest } = req.body;
            // Verificar si ya existe una factura con el mismo número para el proveedor
            const invoiceExists = await supplierInvoice_model_1.SupplierInvoiceModel.findOne({
                idProveedor,
                numeroFactura,
                organizacion: organizationId,
                idSucursal: sucursalId,
            });
            if (invoiceExists) {
                res
                    .status(400)
                    .json({ msg: "Ya existe una factura con este número para el proveedor" });
                return;
            }
            const newInvoice = await supplierInvoice_model_1.SupplierInvoiceModel.create({
                idProveedor,
                numeroFactura,
                organizacion: organizationId,
                idSucursal: sucursalId,
                ...rest,
            });
            res.status(201).json({
                msg: "Factura de proveedor creada correctamente",
                newInvoice,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la factura", error });
        }
    };
    // Obtener todas las facturas de proveedores
    getSupplierInvoices = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user;
            // Filtrar facturas por organización
            const invoices = await supplierInvoice_model_1.SupplierInvoiceModel.find({ organizacion: organizationId });
            res.status(200).json({ message: "Facturas de proveedores:", invoices });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener las facturas de proveedores", error });
        }
    };
    // Obtener una factura de proveedor por ID o término
    getSupplierInvoice = async (req, res) => {
        try {
            const { term } = req.params;
            const { organizationId, sucursalId } = req.user;
            const isMongoId = mongoose_1.default.Types.ObjectId.isValid(term);
            const query = isMongoId
                ? {
                    _id: term,
                    organizacion: organizationId,
                    idSucursal: sucursalId,
                }
                : {
                    numeroFactura: term,
                    organizacion: organizationId,
                    idSucursal: sucursalId,
                };
            const invoice = await supplierInvoice_model_1.SupplierInvoiceModel.findOne(query);
            if (!invoice) {
                res.status(404).json({ msg: "Factura no encontrada" });
                return;
            }
            res.status(200).json({ invoice });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la factura", error });
        }
    };
    // Actualizar una factura de proveedor
    updateSupplierInvoice = async (req, res) => {
        try {
            const { id } = req.params;
            const { numeroFactura, ...rest } = req.body;
            const { organizationId, sucursalId } = req.user;
            const updateData = { ...rest };
            if (numeroFactura) {
                updateData.numeroFactura = numeroFactura.trim();
            }
            // Verificar si la factura existe y pertenece a la organización
            const invoice = await supplierInvoice_model_1.SupplierInvoiceModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            if (!invoice) {
                res.status(404).json({ msg: "Factura no encontrada" });
                return;
            }
            if (invoice.organizacion.toString() !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para actualizar esta factura" });
                return;
            }
            const updatedInvoice = await supplierInvoice_model_1.SupplierInvoiceModel.findOneAndUpdate({ _id: id, organizacion: organizationId, idSucursal: sucursalId }, updateData, { new: true });
            res.status(200).json({ msg: "Factura actualizada correctamente", invoice: updatedInvoice });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la factura", error });
        }
    };
    // Eliminar una factura de proveedor
    deleteSupplierInvoice = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const supplierInvoice = await supplierInvoice_model_1.SupplierInvoiceModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            if (!supplierInvoice) {
                res.status(404).json({ msg: "Factura no encontrada" });
                return;
            }
            if (supplierInvoice.organizacion.toString() !== organizationId) {
                res.status(403).json({ message: "No tienes permiso para eliminar este proveedor" });
                return;
            }
            await supplierInvoice_model_1.SupplierInvoiceModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            res.status(200).json({ msg: "Factura eliminada:", supplierInvoice });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la factura", error });
        }
    };
}
exports.SupplierInvoiceController = SupplierInvoiceController;
//# sourceMappingURL=controller.js.map