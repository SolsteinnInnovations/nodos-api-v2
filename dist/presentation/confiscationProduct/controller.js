"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiscationProductController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const confiscationProduct_model_1 = require("./../../data/mongo/models/confiscationProduct.model");
const product_model_1 = require("./../../data/mongo/models/product.model");
class ConfiscationProductController {
    constructor() { }
    createConfiscationProduct = async (req, res) => {
        try {
            const { idProducto, cantidadDecomisada, sucursal, marca, ...rest } = req.body; // Extraemos 'marca'
            const { organizationId } = req.user;
            // Verificar si el producto existe
            const product = await product_model_1.ProductModel.findById(idProducto);
            if (!product) {
                res.status(404).json({ msg: "Producto no encontrado" });
                return;
            }
            if (product.stock < cantidadDecomisada) {
                res.status(400).json({ msg: "Stock insuficiente en el producto." });
                return;
            }
            // Verificar que el producto tenga sucursales
            if (!Array.isArray(product.sucursales) || product.sucursales.length === 0) {
                res.status(400).json({ msg: "El producto no tiene sucursales asociadas" });
                return;
            }
            // Verificar que la sucursal no sea undefined
            if (!sucursal) {
                res.status(400).json({ msg: "La sucursal es requerida" });
                return;
            }
            // Verificar si la sucursal está vinculada al producto
            const sucursalExistsInProduct = product.sucursales.find((sucursalItem) => sucursalItem.idSucursal?.toString() === sucursal.toString());
            if (!sucursalExistsInProduct) {
                res.status(404).json({ msg: "La sucursal indicada no tiene vinculado dicho producto" });
                return;
            }
            // Actualizar stock en la sucursal
            sucursalExistsInProduct.cantidad -= cantidadDecomisada;
            if (sucursalExistsInProduct.cantidad < 0) {
                res.status(400).json({ msg: "La cantidad en stock no puede ser negativa." });
                return;
            }
            // Actualizar stock total del producto
            product.stock -= cantidadDecomisada;
            product.markModified('sucursales');
            await product.save();
            // Validar campos requeridos antes de crear el producto decomisado
            if (!idProducto || !cantidadDecomisada || !sucursal || !organizationId) {
                res.status(400).json({ msg: "Faltan campos requeridos para crear el producto decomisado" });
                return;
            }
            // Crear el producto decomisado (sin incluir 'marca')
            const newConfiscationProduct = await confiscationProduct_model_1.confiscationProductModel.create({
                idProducto,
                cantidadDecomisada,
                sucursal,
                organizacion: organizationId,
                ...rest, // Incluye solo los campos restantes
            });
            res.status(201).json({
                msg: "Producto decomisado creado correctamente",
                newConfiscationProduct,
            });
        }
        catch (error) {
            console.error("Error al crear el producto decomisado:", error.message);
            if (error.name === "ValidationError") {
                res.status(400).json({ message: "Error de validación", error: error.errors });
            }
            else {
                res.status(500).json({ message: "Error al crear el producto decomisado", error: error.message });
            }
        }
    };
    getConfiscationProducts = async (req, res) => {
        try {
            const confiscationProducts = await confiscationProduct_model_1.confiscationProductModel.find({
                organizacion: req.user.organizationId,
            });
            res.status(200).json({ confiscationProducts });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los productos decomisados", error });
        }
    };
    async getConfiscationProduct(req, res) {
        const { term } = req.params;
        try {
            let confiscationProduct;
            if (mongoose_1.default.Types.ObjectId.isValid(term)) {
                // Search by _id if term is a valid ObjectId
                confiscationProduct = await confiscationProduct_model_1.confiscationProductModel.findById(term);
            }
            else {
                // Otherwise, search by dni
                confiscationProduct = await confiscationProduct_model_1.confiscationProductModel.findOne({ codigo: term });
            }
            if (!confiscationProduct) {
                res.status(404).json({
                    message: "Producto decomisado no encontrado",
                });
                return;
            }
            res.json(confiscationProduct);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el producto decomisado", error });
        }
    }
    async updateConfiscationProduct(req, res) {
        const { id } = req.params;
        const { organizationId } = req.user;
        const updateData = req.body;
        try {
            const updatedConfiscationProduct = await confiscationProduct_model_1.confiscationProductModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            if (!updatedConfiscationProduct) {
                res.status(404).json({ message: "Producto decomisado no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Producto decomisado actualizado correctamente", updatedConfiscationProduct });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto decomisado", error });
        }
    }
    async deleteConfiscationProduct(req, res) {
        const { id } = req.params;
        const { organizationId } = req.user;
        try {
            const deletedConfiscationProduct = await confiscationProduct_model_1.confiscationProductModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            if (!deletedConfiscationProduct) {
                res.status(404).json({ message: "Producto decomisado no encontrado" });
                return;
            }
            res.status(200).json({ msg: "Producto decomisado eliminado correctamente", deletedConfiscationProduct });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto decomisado", error });
        }
    }
}
exports.ConfiscationProductController = ConfiscationProductController;
//# sourceMappingURL=controller.js.map