"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_model_1 = require("./../../data/mongo/models/category.model");
class CategoryController {
    constructor() { }
    createCategory = async (req, res) => {
        try {
            const { nombre, descripcion } = req.body;
            const newNombre = nombre.toLowerCase().trim();
            const newDescripcion = descripcion.toLowerCase().trim();
            const { organizationId } = req.user;
            if (!organizationId) {
                res.status(400).json({ msg: 'No tenes una organizacion vinculada' });
                return;
            }
            const newCategory = await category_model_1.CategoryModel.create({
                nombre: newNombre,
                descripcion: newDescripcion,
                organizacion: organizationId,
            });
            res.status(200).json({
                msg: "Categoría creada correctamente",
                newCategory
            });
            return;
        }
        catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ message: "Error al crear la categoría", error });
            return;
        }
    };
    getCategories = async (req, res) => {
        try {
            const { organizationId } = req.user;
            const categories = await category_model_1.CategoryModel.find({
                organizacion: organizationId
            });
            if (categories.length === 0) {
                res.status(400).json({
                    msg: 'Not categories found, create a new one'
                });
                return;
            }
            res.status(200).json({ categories });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener las categorías", error });
        }
    };
    getCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const category = await category_model_1.CategoryModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!category) {
                res.status(404).json({ message: "Categoría no encontrada" });
                return;
            }
            res.status(200).json({ category });
        }
        catch (error) {
            console.error('Error getting category:', error);
            res.status(500).json({ message: "Error al obtener la categoría", error });
            return;
        }
    };
    updateCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const category = await category_model_1.CategoryModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!category) {
                res.status(404).json({ message: "Categoría no encontrada" });
                return;
            }
            const updatedCategory = await category_model_1.CategoryModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json({ msg: "Categoría actualizada correctamente", updatedCategory });
        }
        catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ message: "Error al actualizar la categoría", error });
            return;
        }
    };
    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const category = await category_model_1.CategoryModel.findOne({
                _id: id,
                organizacion: organizationId,
            });
            if (!category) {
                res.status(404).json({ message: "Categoría no encontrada" });
                return;
            }
            await category_model_1.CategoryModel.findByIdAndDelete(id);
            res.status(200).json({ msg: "Categoría eliminada correctamente" });
        }
        catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ message: "Error al eliminar la categoría", error });
            return;
        }
    };
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=controller.js.map