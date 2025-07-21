import { Request, Response } from "express";
import { createLog } from "../../helpers/createLog";
import { Severidad } from "../../enums/logSeverity.enum";
import { IProductSucursal } from "../../interfaces/IProductSucursal.interface";
import { ProductSucursalModel } from "../../data/mongo/models/productSucursal.model";
// import { ProductModel } from "../../data/mongo/models/product.model";

export class ProductSucursalController {
  // DI
  constructor() { }

  createProductSucursal = async (req: Request, res: Response) => {
    try {
      const productsSucursal: IProductSucursal[] = req.body;
      const newProductsSucursalPromise = [];
      for (const productSucursal of productsSucursal) {
        const {
          productoId,
          sucursalId,
          stock,
          precioCosto,
          precioVentaSucursal,
        } = productSucursal;
        const newProductSucursal: IProductSucursal = {
          stock,
          precioCosto,
          precioVentaSucursal,
          productoId,
          sucursalId,
          organizacion: req.user.organizationId, // Asignar la organización del usuario logueado
        };
        newProductsSucursalPromise.push(newProductSucursal);
      }

      await ProductSucursalModel.insertMany(newProductsSucursalPromise);
      createLog(
        Severidad.INFO,
        `Productos ${newProductsSucursalPromise} creados  correctamente  por: ${req.user.username}`
      );
      res.status(200).json({
        msg: "Productos creados correctamente",
      });
    } catch (error) {
      res.status(500).json({ message: "Error al crear los productos", error });
    }
  };

  getProductsSucursal = async (req: Request, res: Response) => {
    try {
      const products = await ProductSucursalModel.find({
        organizacion: req.user.organizationId,
      })
        .populate("producto")
        .populate("producto.marca"); // Esto trae los datos completos de la categoría

      res.status(200).json({ products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos", error });
    }
    
  };

  obtenerProductosConStockTotal = async (req: Request, res: Response) => {
    try {
      const resultado = await ProductSucursalModel.aggregate([
        {
          $group: {
            _id: "$productoId",
            stockTotal: { $sum: "$stock" }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "producto"
          }
        },
        { $unwind: "$producto" },
        {
          $project: {
            productoId: "$producto._id",
            nombre: "$producto.nombre",
            descripcion: "$producto.descripcion",
            stockTotal: 1,
            _id: 0
          }
        }
      ]);

      res.status(200).json({ resultado });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos", error });
    }

  };
  updateProductSucursal = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;
      const updateData: Partial<IProductSucursal> = req.body;

      const existingProductSucursal = await ProductSucursalModel.findOne({
        _id: id,
        organizacion: organizationId,
      });

      if (!existingProductSucursal) {
        res.status(404).json({ message: "ProductoSucursal no encontrado" });
        return;
      }

      const updatedProductSucursal =
        await ProductSucursalModel.findOneAndUpdate(
          { _id: id, organizacion: organizationId },
          updateData,
          { new: true }
        );

      createLog(
        Severidad.INFO,
        `ProductoSucursal actualizado correctamente. ProductoSucursal: ${existingProductSucursal} \n Actualizado: ${updatedProductSucursal} - Usuario ${req.user.username}`
      );

      res.status(200).json({
        msg: "ProductoSucursal actualizado correctamente",
        productSucursal: updatedProductSucursal,
      });
      return;
    } catch (error) {
      createLog(
        Severidad.ERROR,
        `Error al actualizar ProductoSucursal con id ${req.params.id} - Usuario ${req.user.username}`
      );
      res
        .status(500)
        .json({ message: "Error al actualizar el productoSucursal", error });
    }
  };

  deleteProductSucursal = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;

      const productSucursal = await ProductSucursalModel.findOne({
        _id: id,
        organizacion: organizationId,
      });

      if (!productSucursal) {
        res.status(404).json({ message: "ProductoSucursal no encontrado" });
        return;
      }

      await ProductSucursalModel.findOneAndDelete({
        _id: id,
        organizacion: organizationId,
      });

      createLog(
        Severidad.INFO,
        `ProductoSucursal eliminado correctamente. ProductoSucursal: ${productSucursal} - Usuario ${req.user.username}`
      );

      res.status(200).json({
        msg: "ProductoSucursal eliminado correctamente",
        productSucursal,
      });
      return;
    } catch (error) {
      createLog(
        Severidad.ERROR,
        `Error al eliminar ProductoSucursal con id ${req.params.id} - Usuario ${req.user.username}`
      );
      res
        .status(500)
        .json({ message: "Error al eliminar el productoSucursal", error });
    }
  };
}
