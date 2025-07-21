import { Request, Response } from "express";
import { isMongoId, isNumber } from "class-validator";
import xlsx, { WorkSheet } from "xlsx";
import { ProductModel } from "../../data/mongo/models/product.model";
import { IProduct, IProductInvalid } from "../../interfaces/IProduct.interface";
import { validateAndFormatProducts } from "../../helpers/bulkValidation";
import { CategoryModel } from "../../data/mongo/models/category.model";
import { BrandModel } from "../../data/mongo/models/brand.model";
import { createLog } from "../../helpers/createLog";
import { Severidad } from "../../enums/logSeverity.enum";
import { ProductSucursalModel } from "../../data/mongo/models/productSucursal.model"; // Asegúrate de tener este modelo

export class ProductController {
  // DI
  constructor() {}


  //TO DO REVISAR FLUJO Y LOGICA DE CREATEPRODUCT 
  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const products: IProduct[] = Array.isArray(req.body)
        ? req.body
        : [req.body];

      const newProducts: IProduct[] = [];
      const notCreated: IProductInvalid[] = [];

      const { organizationId } = req.user;

      for (const product of products) {
        const { codigo, nombre, categoria, marca, ...rest } = product;

        const newNombre = nombre.toLowerCase().trim();
        const nombreCategoria = categoria.toLowerCase().trim();

        const [codigoExists, categoriaExists, marcaExists] = await Promise.all([
          ProductModel.findOne({ codigo, organizacion: organizationId }),
          CategoryModel.findOne({
            nombre: nombreCategoria,
            organizacion: organizationId,
          }),
          BrandModel.findOne({
            nombre: marca.toUpperCase().trim(),
            organizacion: organizationId,
          }),
        ]);

        if (codigoExists) {
          notCreated.push({
            codigo,
            categoria,
            marca,
            nombre: newNombre,
            msg: "El código ingresado ya se encuentra registrado, no se puede duplicar",
          });
          continue;
        }

        if (!categoriaExists) {
          notCreated.push({
            codigo,
            categoria,
            marca,
            nombre: newNombre,
            msg: "La categoria no se encuentra registrada, por favor cargue dicha categoria antes de crear el producto",
          });
          continue;
        }

        if (!marcaExists) {
          notCreated.push({
            codigo,
            categoria,
            marca,
            nombre: newNombre,
            msg: "La marca no se encuentra registrada, por favor cargue dicha marca antes de crear el producto",
          });
          continue;
        }

        // Crear producto
        const newProduct = await ProductModel.create({
          codigo,
          nombre: newNombre,
          categoria: categoriaExists,
          marca: marcaExists,
          organizacion: organizationId,
          ...rest,
        });

        newProducts.push(newProduct);
      }

      if (newProducts.length === 0 && notCreated.length > 0) {
        res.status(400).json({
          msg: "Hubo un error al procesar uno o más productos",
          notCreated,
        });
        return;
      }

      createLog(
        Severidad.INFO,
        `Productos creados correctamente: ${newProducts.length} por: ${req.user.username}`
      );

      res.status(200).json({
        msg: "Productos creados correctamente",
        newProducts,
        notCreated,
      });
    } catch (error) {
      console.error("Error al crear productos:", error);
      res.status(500).json({
        message: "Error al crear los productos",
        error: error.message,
      });
    }
  };

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await ProductModel.find({
        organizacion: req.user.organizationId,
      })
        .populate("categoria", "nombre")
        .populate("marca", "nombre");

      res.status(200).json({ products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos", error });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { term } = req.params;
      const { organizationId } = req.user;
      let query: any;

      if (isMongoId(term)) {
        query = { _id: term, organizacion: organizationId };
      } else if (isNumber(+term)) {
        query = { codigo: term, organizacion: organizationId };
      } else {
        query = {
          nombre: { $regex: new RegExp(term, "i") },
          organizacion: organizationId,
        };
      }

      const product = await ProductModel.find(query);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el producto", error });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nombre, ...rest } = req.body;
      const { organizationId } = req.user;
      const updateData: any = { ...rest };

      if (nombre) {
        updateData.nombre = nombre.toLowerCase().trim();
      }

      const product: IProduct = await ProductModel.findOne({
        _id: id,
        organizacion: organizationId,
      });
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      if (product.organizacion.toString() !== organizationId) {
        res
          .status(403)
          .json({ message: "No tienes permiso para actualizar este producto" });
        return;
      }

      const updatedProduct = await ProductModel.findOneAndUpdate(
        { _id: id, organizacion: organizationId },
        updateData
        // { new: true }
      );
      createLog(
        Severidad.INFO,
        `Producto actualizado correctamente. Producto ${product} \n Actualizado: ${updatedProduct} - Usuario ${req.user.username}`
      );
      res.status(200).json({
        product: updatedProduct,
        msg: "Producto actualizado correctamente",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el producto", error });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId } = req.user;

      const product: IProduct = await ProductModel.findOne({
        _id: id,
        organizacion: organizationId,
      });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      if (product.organizacion.toString() !== organizationId) {
        res
          .status(403)
          .json({ message: "No tienes permiso para eliminar este producto" });
        return;
      }

      // Eliminar producto
      await ProductModel.findOneAndDelete({
        _id: id,
        organizacion: organizationId,
      });

      // 🔥 Eliminar todos los registros de ProductSucursal que correspondan a este producto
      await ProductSucursalModel.deleteMany({ producto: id });

      createLog(
        Severidad.INFO,
        `Producto eliminado correctamente. Producto ${product} \n - Usuario ${req.user.username}`
      );

      res.status(200).json({
        product,
        msg: "Producto y sus stocks en sucursales eliminados correctamente",
      });
    } catch (error) {
      createLog(
        Severidad.ERROR,
        `Hubo un error al eliminar el producto con id ${req.params.id}\n Usuario ${req.user.username}`
      );
      res.status(500).json({ message: "Error al eliminar el producto", error });
    }
  };

  bulkUploadProducts = async (req: Request, res: Response): Promise<void> => {
    const file = req.files.File[0] || req.files.File;
    const buffer = file.data;

    try {
      // Leer el archivo Excel
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excel: WorkSheet = xlsx.utils.sheet_to_json(worksheet);

      // Obtener organizationId del usuario logueado
      const { organizationId } = req.user;

      // Validar y formatear los productos
      const { validProducts, errors } = await validateAndFormatProducts(
        organizationId,
        excel[0]
      ); // Agregar await aquí

      if (errors.length > 0) {
        res.status(400).json({
          message: "Errores en los datos del archivo",
          errors,
        });
        return; // Ensure no further execution
      }

      // Insertar los productos validados
      await ProductModel.insertMany(validProducts);

      res.status(200).json({
        msg: "Procesamiento completado",
        newProducts: validProducts,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al procesar el archivo: " + error.message });
    }
  };

  lowStockProducts = async (req: Request, res: Response) => {
    try {
      const { organizationId } = req.user;
      const products = await ProductModel.find({
        organizacion: organizationId,
        stock: { $lte: 5 },
      });
      res.status(200).json({ products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los productos", error });
    }
  };
}
