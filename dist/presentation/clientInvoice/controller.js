"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInvoiceController = void 0;
const class_validator_1 = require("class-validator");
const clientInvoice_model_1 = require("../../data/mongo/models/clientInvoice.model"); // Asegúrate de tener este modelo
const dailyCash_model_1 = require("../../data/mongo/models/dailyCash.model");
const productSucursal_model_1 = require("../../data/mongo/models/productSucursal.model");
const product_model_1 = require("../../data/mongo/models/product.model");
// LLAMAR AL MODELO DE PRODUCT SUCURSAL
// import { ProductSucursalModel } from "../../data/mongo/models/productSucursal.model"; // Asegúrate de tener este modelo
//BUSCAR EL ID DEL PRODUCTO Y RESTAR LA CANTIDAD VENDIDA AL STOCK DEL MISMO
class ClientInvoiceController {
    constructor() { }
    // Crear un clienteInvoice
    // TO DO: CLIENTINVOICE RESTA PRODUCTSUCURSAL.STOCK
    createClientInvoice = async (req, res) => {
        try {
            let { caja = false, items = [], subtotal, total, descuento, recargo, ...rest } = req.body;
            const { organizationId, sucursalId, id } = req.user;
            // Default descuento y recargo a 0 si no vienen definidos
            descuento = typeof descuento === "number" ? descuento : 0;
            recargo = typeof recargo === "number" ? recargo : 0;
            // Validación de productos y cálculo de subtotales
            let calculatedSubtotal = 0;
            for (const item of items) {
                const { id: productoId, cantidad } = item;
                const product = await product_model_1.ProductModel.findOne({
                    _id: productoId,
                    organizacion: organizationId,
                });
                if (!product) {
                    res.status(400).json({
                        message: `Producto no encontrado: ${productoId}`,
                    });
                    return;
                }
                if (typeof product.precioVenta !== "number") {
                    res.status(400).json({
                        message: `Producto sin precioVenta definido: ${productoId}`,
                    });
                    return;
                }
                calculatedSubtotal += product.precioVenta * cantidad;
            }
            // Redondeos para evitar errores de coma flotante
            calculatedSubtotal = Math.round(calculatedSubtotal * 100) / 100;
            const expectedTotal = Math.round((calculatedSubtotal - descuento + recargo) * 100) / 100;
            console.log(`Subtotal calculado: ${calculatedSubtotal}, Total esperado: ${expectedTotal}`);
            // Validación de subtotal
            if (Math.round(subtotal * 100) / 100 !== calculatedSubtotal) {
                res.status(400).json({
                    message: `El subtotal enviado (${subtotal}) no coincide con el calculado (${calculatedSubtotal})`,
                });
                return;
            }
            // Validación de total
            if (Math.round(total * 100) / 100 !== expectedTotal) {
                res.status(400).json({
                    message: `El total enviado (${total}) no coincide con el calculado (${expectedTotal}) usando descuento: ${descuento} y recargo: ${recargo}`,
                });
                return;
            }
            // Validar y setear caja
            if (caja) {
                try {
                    const newCaja = await dailyCash_model_1.DailyCashModel.findOne({
                        _id: caja,
                        organizacion: organizationId,
                        idSucursal: sucursalId,
                    });
                    rest = {
                        ...rest,
                        caja: newCaja,
                    };
                }
                catch (error) {
                    res.status(400).json({
                        message: "Caja no encontrada o no pertenece a la organización",
                    });
                    return;
                }
            }
            // Crear el clienteInvoice
            const newClienteInvoice = await clientInvoice_model_1.clientInvoiceModel.create({
                organizacion: organizationId,
                idSucursal: sucursalId,
                usuario: id,
                subtotal: calculatedSubtotal,
                total: expectedTotal,
                descuento,
                recargo,
                items,
                ...rest,
            });
            // Actualizar stock
            for (const item of items) {
                const { id: productoId, cantidad } = item;
                const productSucursal = (await productSucursal_model_1.ProductSucursalModel.findOne({
                    producto: productoId,
                    sucursal: sucursalId,
                    organizacion: organizationId,
                }));
                if (!productSucursal) {
                    console.warn(`ProductoSucursal no encontrado para producto: ${productoId}`);
                    continue;
                }
                productSucursal.stock = Math.max(0, (productSucursal.stock || 0) - cantidad);
                await productSucursal.save();
                const product = await product_model_1.ProductModel.findOne({
                    _id: productoId,
                    organizacion: organizationId,
                });
                if (!product) {
                    console.warn(`Producto general no encontrado: ${productoId}`);
                    continue;
                }
                // product.stock = Math.max(0, (product.stock || 0) - cantidad);
                await product.save();
            }
            res.status(200).json({
                msg: "ClienteInvoice creado correctamente",
                newClienteInvoice,
            });
            return;
        }
        catch (error) {
            console.error("Error creating clienteInvoice:", error);
            res
                .status(500)
                .json({ message: "Error al crear el clienteInvoice", error });
        }
    };
    // Obtener todos los clienteInvoices
    getAllClientInvoices = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user; // Obtener organizationId del usuario logueado
            const clienteInvoices = await clientInvoice_model_1.clientInvoiceModel.find({
                organizacion: organizationId,
            });
            res.status(200).json({ clienteInvoices });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los clienteInvoices", error });
        }
    };
    getAllClientInvoicesBySucursal = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user; // Obtener organizationId del usuario logueado
            const clienteInvoices = await clientInvoice_model_1.clientInvoiceModel
                .find({
                organizacion: organizationId,
                idSucursal: sucursalId,
            })
                .populate("cliente", "nombre apellido");
            res.status(200).json({ clienteInvoices });
        }
        catch (error) { }
    };
    // Obtener todos los clienteInvoices
    getAllUnpaidClientInvoices = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user; // Obtener organizationId del usuario logueado
            const clienteInvoices = await clientInvoice_model_1.clientInvoiceModel.find({
                organizacion: organizationId,
                idSucursal: sucursalId,
                estado: false,
            });
            res.status(200).json({ clienteInvoices });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los clienteInvoices", error });
        }
    };
    // Obtener un clienteInvoice por ID o término
    getOneClientInvoice = async (req, res) => {
        try {
            const { term } = req.params;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            let query;
            if ((0, class_validator_1.isMongoId)(term)) {
                query = { _id: term, organizacion: organizationId };
            }
            else {
                query = { nombre: new RegExp(term, "i"), organizacion: organizationId };
            }
            const clienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOne(query);
            if (!clienteInvoice) {
                res.status(404).json({ message: "ClienteInvoice no encontrado" });
                return;
            }
            res.status(200).json({ clienteInvoice });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener el clienteInvoice", error });
        }
    };
    // Actualizar un clienteInvoice
    updateClientInvoice = async (req, res) => {
        try {
            const { id } = req.params;
            const { ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // Verificar si el clienteInvoice existe y pertenece a la organización
            const clienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!clienteInvoice) {
                res.status(404).json({ message: "ClienteInvoice no encontrado" });
                return;
            }
            // Actualizar el clienteInvoice
            const updatedClienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, rest, { new: true });
            res.status(200).json({
                message: "ClienteInvoice actualizado correctamente",
                clienteInvoice: updatedClienteInvoice,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al actualizar el clienteInvoice", error });
        }
    };
    payClientInvoice = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // Verificar si el clienteInvoice existe y pertenece a la organización
            const clienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!clienteInvoice) {
                res.status(404).json({ message: "ClienteInvoice no encontrado" });
                return;
            }
            // Actualizar solo el estado a true
            const updatedClienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, { estado: true, fechaPago: new Date() }, { new: true });
            res.status(200).json({
                message: "Pago registrado correctamente",
                clienteInvoice: updatedClienteInvoice,
            });
        }
        catch (error) {
            console.error("Error al actualizar ClienteInvoice:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    };
    // Eliminar un clienteInvoice
    deleteClientInvoice = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // Verificar si el clienteInvoice existe y pertenece a la organización
            const clienteInvoice = await clientInvoice_model_1.clientInvoiceModel.findOne({
                _id: id,
            });
            if (!clienteInvoice) {
                res.status(404).json({ message: "ClienteInvoice no encontrado" });
                return;
            }
            if (clienteInvoice.organizacion.toString() !== organizationId) {
                res.status(403).json({
                    message: "No tienes permiso para eliminar este clienteInvoice",
                });
                return;
            }
            // Eliminar el clienteInvoice
            await clientInvoice_model_1.clientInvoiceModel.findOneAndDelete({
                _id: id,
                organizacion: organizationId,
            });
            res.status(200).json({
                clienteInvoice,
                msg: "ClienteInvoice eliminado correctamente",
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al eliminar el clienteInvoice", error });
        }
    };
}
exports.ClientInvoiceController = ClientInvoiceController;
//# sourceMappingURL=controller.js.map