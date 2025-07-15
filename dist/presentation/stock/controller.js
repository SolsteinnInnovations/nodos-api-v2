"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSucursalController = void 0;
const productSucursal_model_1 = require("../../data/mongo/models/productSucursal.model");
class ProductSucursalController {
    constructor() { }
    addStock = async (req, res) => {
        try {
            const { descripcion, ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // Crear la sucursal con el organizationId
            const descripcionExists = await productSucursal_model_1.ProductSucursalModel.findOne({ descripcion });
            if (descripcionExists) {
                res
                    .status(400)
                    .json({ msg: "La sucursal con esta descripción ya existe" });
                return;
            }
            const newSucursal = await productSucursal_model_1.ProductSucursalModel.create({
                descripcion,
                organizacion: organizationId,
                ...rest,
            });
            res.status(200).json({
                msg: "Sucursal creada correctamente",
                newSucursal,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la sucursal", error });
        }
    };
    getProductSucursal = async (req, res) => {
        try {
            const listProductSucursal = await productSucursal_model_1.ProductSucursalModel.find({
                organizacion: req.user.organizationId
            });
            res.status(200).json({ listProductSucursal });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los datos", error });
        }
    };
    getSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const sucursal = await productSucursal_model_1.ProductSucursalModel.findById(id);
            if (!sucursal) {
                res.status(404).json({ msg: "La sucursal no existe" });
                return;
            }
            res.status(200).json({ sucursal });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la sucursal", error });
        }
    };
    updateSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion, ...rest } = req.body;
            const updateData = { ...rest };
            if (descripcion)
                updateData.descripcion = descripcion.toLowerCase().trim();
            const sucursal = await productSucursal_model_1.ProductSucursalModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });
            if (sucursal) {
                res.status(200).json({ sucursal, msg: "Sucursal  actualizado correctamente" });
            }
            else {
                res.status(404).json({ message: 'Sucursal not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el Sucursal", error });
        }
    };
    deleteSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const sucursal = await productSucursal_model_1.ProductSucursalModel.findByIdAndDelete(id);
            if (!sucursal) {
                res.status(404).json({ msg: "La sucursal no existe" });
                return;
            }
            res.status(200).json({ msg: "Sucursal eliminada correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la sucursal", error });
        }
    };
}
exports.ProductSucursalController = ProductSucursalController;
//# sourceMappingURL=controller.js.map