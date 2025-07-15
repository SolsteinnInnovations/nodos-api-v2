"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsController = void 0;
const returns_model_1 = require("../../data/mongo/models/returns.model");
const product_model_1 = require("../../data/mongo/models/product.model");
class ReturnsController {
    // Crear una nueva devolución
    createReturn = async (req, res) => {
        try {
            const { idProducto, cantidad, precio, idFacturaProveedor, observaciones, ...rest } = req.body;
            const { organizationId, sucursalId } = req.user;
            // Verificar si el producto existe
            const producto = await product_model_1.ProductModel.findById(idProducto);
            if (!producto) {
                res.status(404).json({ msg: "Producto no encontrado" });
                return;
            }
            const sucursalExistsInProduct = producto.sucursales.find((sucursal) => sucursal.idSucursal.toString() === sucursalId.toString());
            if (!sucursalExistsInProduct) {
                res.status(404).json({ msg: "La sucursal indicada no tiene vinculado dicho producto" });
                return;
            }
            producto.sucursales[0].cantidad -= cantidad;
            if (producto.sucursales[0].cantidad < 0) {
                res.status(400).json({ msg: "La cantidad en stock no puede ser negativa." });
                return;
            }
            producto.stock -= cantidad;
            // ¡Marcar el campo como modificado! esto es debido a que es un array insertado por nosotros y no un documento en si de mongo
            producto.markModified('sucursales');
            // Guardar el producto actualizado
            await producto.save();
            // Crear la devolución
            const newReturn = await returns_model_1.ReturnsModel.create({
                idProducto,
                cantidad,
                precio,
                idFacturaProveedor,
                idSucursal: sucursalId,
                observaciones,
                organizacion: organizationId,
                ...rest,
            });
            res.status(201).json({
                msg: "Devolución creada correctamente",
                newReturn,
            });
        }
        catch (error) {
            console.error("Error al crear la devolución:", error.message);
            res.status(500).json({ message: "Error al crear la devolución", error: error.message });
        }
    };
    // Obtener todas las devoluciones
    getReturns = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user;
            // Filtrar devoluciones por organización
            const returns = await returns_model_1.ReturnsModel.find({ organizacion: organizationId, idSucursal: sucursalId });
            res.status(200).json({ returns });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener las devoluciones", error });
        }
    };
    // Obtener una devolución por ID
    getReturn = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const returnItem = await returns_model_1.ReturnsModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            if (!returnItem) {
                res.status(404).json({ msg: "Devolución no encontrada" });
                return;
            }
            res.status(200).json({ returnItem });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la devolución", error });
        }
    };
    // Actualizar una devolución
    updateReturn = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const updateData = req.body;
            // Verificar si la devolución existe y pertenece a la organización
            const returnItem = await returns_model_1.ReturnsModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            if (!returnItem) {
                res.status(404).json({ msg: "Devolución no encontrada" });
                return;
            }
            const updatedReturn = await returns_model_1.ReturnsModel.findOneAndUpdate({ _id: id, organizacion: organizationId, idSucursal: sucursalId }, updateData, { new: true });
            res.status(200).json({
                msg: "Devolución actualizada correctamente",
                updatedReturn,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la devolución", error });
        }
    };
    // Eliminar una devolución
    deleteReturn = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            // Verificar si la devolución existe y pertenece a la organización
            const returnItem = await returns_model_1.ReturnsModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            if (!returnItem) {
                res.status(404).json({ msg: "Devolución no encontrada" });
                return;
            }
            await returns_model_1.ReturnsModel.deleteOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
            res.status(200).json({ msg: "Devolución eliminada correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la devolución", error });
        }
    };
}
exports.ReturnsController = ReturnsController;
//# sourceMappingURL=controller.js.map