import { Request, Response } from "express";
import { CategoryModel } from "./../../data/mongo/models/category.model";
import { ICategory } from "./../../interfaces/ICategory.interface";

export class CategoryController {
  constructor() {}

  createCategory = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion } = req.body as ICategory;
      const newNombre = nombre.toLowerCase().trim();
      const newDescripcion = descripcion.toLowerCase().trim();

      const { organizationId } = req.user;
      if (!organizationId) {
        res.status(400).json({ msg: "No tenes una organizacion vinculada" });
        return;
      }

      const newCategory = await CategoryModel.create({
        nombre: newNombre,
        descripcion: newDescripcion,
        organizacion: organizationId,
      });

      res.status(200).json({
        msg: "Categoría creada correctamente",
        newCategory,
      });
      return;
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Error al crear la categoría", error });
      return;
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      const { organizationId } = req.user;
      const categories = await CategoryModel.find({
        organizacion: organizationId,
      });
      if (categories.length === 0) {
        res.status(400).json({
          msg: "Not categories found, create a new one",
        });
        return;
      }
      res.status(200).json({ categories });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las categorías", error });
    }
  };

  getCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;
      const category = await CategoryModel.findOne({
        _id: id,
        organizacion: organizationId,
      });
      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
      res.status(200).json({ category });
    } catch (error) {
      console.error("Error getting category:", error);
      res.status(500).json({ message: "Error al obtener la categoría", error });
      return;
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;
      const category = await CategoryModel.findOne({
        _id: id,
        organizacion: organizationId,
      });
      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ msg: "Categoría actualizada correctamente", updatedCategory });
    } catch (error) {
      console.error("Error updating category:", error);
      res
        .status(500)
        .json({ message: "Error al actualizar la categoría", error });
      return;
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;
      const category = await CategoryModel.findOne({
        _id: id,
        organizacion: organizationId,
      });
      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
      await CategoryModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res
        .status(500)
        .json({ message: "Error al eliminar la categoría", error });
      return;
    }
  };
}
