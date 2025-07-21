"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSucursalController = void 0;
const createLog_1 = require("../../helpers/createLog");
const logSeverity_enum_1 = require("../../enums/logSeverity.enum");
const productSucursal_model_1 = require("../../data/mongo/models/productSucursal.model");
// import { ProductModel } from "../../data/mongo/models/product.model";
class ProductSucursalController {
    // DI
    constructor() { }
    createProductSucursal = async (req, res) => {
        try {
            const productsSucursal = req.body;
            const newProductsSucursalPromise = [];
            for (const productSucursal of productsSucursal) {
                const { productoId, sucursalId, stock, precioCosto, precioVentaSucursal, } = productSucursal;
                const newProductSucursal = {
                    stock,
                    precioCosto,
                    precioVentaSucursal,
                    productoId,
                    sucursalId,
                    organizacion: req.user.organizationId, // Asignar la organización del usuario logueado
                };
                newProductsSucursalPromise.push(newProductSucursal);
            }
            await productSucursal_model_1.ProductSucursalModel.insertMany(newProductsSucursalPromise);
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `Productos ${newProductsSucursalPromise} creados  correctamente  por: ${req.user.username}`);
            res.status(200).json({
                msg: "Productos creados correctamente",
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear los productos", error });
        }
    };
    getProductsSucursal = async (req, res) => {
        try {
            const products = await productSucursal_model_1.ProductSucursalModel.find({
                organizacion: req.user.organizationId,
            })
                .populate("producto")
                .populate("producto.marca"); // Esto trae los datos completos de la categoría
            res.status(200).json({ products });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los productos", error });
        }
    };
    updateProductSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const updateData = req.body;
            const existingProductSucursal = await productSucursal_model_1.ProductSucursalModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!existingProductSucursal) {
                res.status(404).json({ message: "ProductoSucursal no encontrado" });
                return;
            }
            const updatedProductSucursal = await productSucursal_model_1.ProductSucursalModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `ProductoSucursal actualizado correctamente. ProductoSucursal: ${existingProductSucursal} \n Actualizado: ${updatedProductSucursal} - Usuario ${req.user.username}`);
            res.status(200).json({
                msg: "ProductoSucursal actualizado correctamente",
                productSucursal: updatedProductSucursal,
            });
            return;
        }
        catch (error) {
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.ERROR, `Error al actualizar ProductoSucursal con id ${req.params.id} - Usuario ${req.user.username}`);
            res
                .status(500)
                .json({ message: "Error al actualizar el productoSucursal", error });
        }
    };
    deleteProductSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const productSucursal = await productSucursal_model_1.ProductSucursalModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!productSucursal) {
                res.status(404).json({ message: "ProductoSucursal no encontrado" });
                return;
            }
            await productSucursal_model_1.ProductSucursalModel.findOneAndDelete({
                _id: id,
                organizacion: organizationId,
            });
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `ProductoSucursal eliminado correctamente. ProductoSucursal: ${productSucursal} - Usuario ${req.user.username}`);
            res.status(200).json({
                msg: "ProductoSucursal eliminado correctamente",
                productSucursal,
            });
            return;
        }
        catch (error) {
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.ERROR, `Error al eliminar ProductoSucursal con id ${req.params.id} - Usuario ${req.user.username}`);
            res
                .status(500)
                .json({ message: "Error al eliminar el productoSucursal", error });
        }
    };
}
exports.ProductSucursalController = ProductSucursalController;
//# sourceMappingURL=controller.js.map