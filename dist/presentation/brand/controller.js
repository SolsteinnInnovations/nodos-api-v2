"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandController = void 0;
const brand_model_1 = require("../../data/mongo/models/brand.model");
class BrandController {
    constructor() { }
    createBrand = async (req, res) => {
        try {
            const { descripcion, nombre } = req.body;
            const { organizationId } = req.user;
            const newdescripcion = descripcion.toLowerCase().trim();
            const newNombre = nombre.toUpperCase().trim();
            const existBrand = await brand_model_1.BrandModel.findOne({
                nombre: newNombre
            });
            if (existBrand) {
                res.status(400).json({
                    msg: "La marca ingresada ya esta registrada",
                    newNombre
                });
                return;
            }
            const newBrand = await brand_model_1.BrandModel.create({
                descripcion: newdescripcion,
                nombre: newNombre,
                organizacion: organizationId,
            });
            res.status(200).json({
                msg: "Marca creada correctamente",
                newBrand
            });
            return;
        }
        catch (error) {
            console.error('Error creating brand:', error);
            res.status(500).json({ message: "Error al crear la marca", error });
            return;
        }
    };
    getBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const brand = await brand_model_1.BrandModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!brand) {
                res.status(404).json({ message: "Marca no encontrada" });
                return;
            }
            res.status(200).json({ brand });
        }
        catch (error) {
            console.error('Error getting brand:', error);
            res.status(500).json({ message: "Error al obtener la marca", error });
            return;
        }
    };
    getBrands = async (req, res) => {
        try {
            const { organizationId } = req.user;
            const brands = await brand_model_1.BrandModel.find({
                organizacion: organizationId,
            });
            res.status(200).json({ brands });
            return;
        }
        catch (error) {
            console.error('Error getting brands:', error);
            res.status(500).json({ message: "Error al obtener las marcas", error });
            return;
        }
    };
    updateBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const updateData = req.body;
            const updatedBrand = await brand_model_1.BrandModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData, { new: true });
            if (!updatedBrand) {
                res.status(404).json({ message: "Marca no encontrada" });
                return;
            }
            res.status(200).json({ msg: "Marca actualizada correctamente", updatedBrand });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la marca", error });
        }
    };
    deleteBrand = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const deletedBrand = await brand_model_1.BrandModel.findOneAndDelete({ _id: id, organizacion: organizationId });
            if (!deletedBrand) {
                res.status(404).json({ message: "Marca no encontrada" });
                return;
            }
            res.status(200).json({ msg: "Marca eliminada correctamente", deletedBrand });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la marca", error });
        }
    };
}
exports.BrandController = BrandController;
//# sourceMappingURL=controller.js.map