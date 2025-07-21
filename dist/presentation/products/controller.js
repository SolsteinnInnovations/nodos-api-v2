"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const class_validator_1 = require("class-validator");
const xlsx_1 = __importDefault(require("xlsx"));
const product_model_1 = require("../../data/mongo/models/product.model");
const bulkValidation_1 = require("../../helpers/bulkValidation");
const category_model_1 = require("../../data/mongo/models/category.model");
const brand_model_1 = require("../../data/mongo/models/brand.model");
const createLog_1 = require("../../helpers/createLog");
const logSeverity_enum_1 = require("../../enums/logSeverity.enum");
const productSucursal_model_1 = require("../../data/mongo/models/productSucursal.model"); // Asegúrate de tener este modelo
class ProductController {
    // DI
    constructor() { }
    //TO DO REVISAR FLUJO Y LOGICA DE CREATEPRODUCT 
    createProduct = async (req, res) => {
        try {
            const products = Array.isArray(req.body)
                ? req.body
                : [req.body];
            const newProducts = [];
            const notCreated = [];
            const { organizationId } = req.user;
            for (const product of products) {
                const { codigo, nombre, categoria, marca, ...rest } = product;
                const newNombre = nombre.toLowerCase().trim();
                const nombreCategoria = categoria.toLowerCase().trim();
                const [codigoExists, categoriaExists, marcaExists] = await Promise.all([
                    product_model_1.ProductModel.findOne({ codigo, organizacion: organizationId }),
                    category_model_1.CategoryModel.findOne({
                        nombre: nombreCategoria,
                        organizacion: organizationId,
                    }),
                    brand_model_1.BrandModel.findOne({
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
                const newProduct = await product_model_1.ProductModel.create({
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
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `Productos creados correctamente: ${newProducts.length} por: ${req.user.username}`);
            res.status(200).json({
                msg: "Productos creados correctamente",
                newProducts,
                notCreated,
            });
        }
        catch (error) {
            console.error("Error al crear productos:", error);
            res.status(500).json({
                message: "Error al crear los productos",
                error: error.message,
            });
        }
    };
    getProducts = async (req, res) => {
        try {
            const products = await product_model_1.ProductModel.find({
                organizacion: req.user.organizationId,
            })
                .populate("categoria", "nombre")
                .populate("marca", "nombre");
            res.status(200).json({ products });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los productos", error });
        }
    };
    getProduct = async (req, res) => {
        try {
            const { term } = req.params;
            const { organizationId } = req.user;
            let query;
            if ((0, class_validator_1.isMongoId)(term)) {
                query = { _id: term, organizacion: organizationId };
            }
            else if ((0, class_validator_1.isNumber)(+term)) {
                query = { codigo: term, organizacion: organizationId };
            }
            else {
                query = {
                    nombre: { $regex: new RegExp(term, "i") },
                    organizacion: organizationId,
                };
            }
            const product = await product_model_1.ProductModel.find(query);
            res.status(200).json({ product });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el producto", error });
        }
    };
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, ...rest } = req.body;
            const { organizationId } = req.user;
            const updateData = { ...rest };
            if (nombre) {
                updateData.nombre = nombre.toLowerCase().trim();
            }
            const product = await product_model_1.ProductModel.findOne({
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
            const updatedProduct = await product_model_1.ProductModel.findOneAndUpdate({ _id: id, organizacion: organizationId }, updateData
            // { new: true }
            );
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `Producto actualizado correctamente. Producto ${product} \n Actualizado: ${updatedProduct} - Usuario ${req.user.username}`);
            res.status(200).json({
                product: updatedProduct,
                msg: "Producto actualizado correctamente",
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al actualizar el producto", error });
        }
    };
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const product = await product_model_1.ProductModel.findOne({
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
            await product_model_1.ProductModel.findOneAndDelete({
                _id: id,
                organizacion: organizationId,
            });
            // 🔥 Eliminar todos los registros de ProductSucursal que correspondan a este producto
            await productSucursal_model_1.ProductSucursalModel.deleteMany({ producto: id });
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.INFO, `Producto eliminado correctamente. Producto ${product} \n - Usuario ${req.user.username}`);
            res.status(200).json({
                product,
                msg: "Producto y sus stocks en sucursales eliminados correctamente",
            });
        }
        catch (error) {
            (0, createLog_1.createLog)(logSeverity_enum_1.Severidad.ERROR, `Hubo un error al eliminar el producto con id ${req.params.id}\n Usuario ${req.user.username}`);
            res.status(500).json({ message: "Error al eliminar el producto", error });
        }
    };
    bulkUploadProducts = async (req, res) => {
        const file = req.files.File[0] || req.files.File;
        const buffer = file.data;
        try {
            // Leer el archivo Excel
            const workbook = xlsx_1.default.read(buffer, { type: "buffer" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const excel = xlsx_1.default.utils.sheet_to_json(worksheet);
            // Obtener organizationId del usuario logueado
            const { organizationId } = req.user;
            // Validar y formatear los productos
            const { validProducts, errors } = await (0, bulkValidation_1.validateAndFormatProducts)(organizationId, excel[0]); // Agregar await aquí
            if (errors.length > 0) {
                res.status(400).json({
                    message: "Errores en los datos del archivo",
                    errors,
                });
                return; // Ensure no further execution
            }
            // Insertar los productos validados
            await product_model_1.ProductModel.insertMany(validProducts);
            res.status(200).json({
                msg: "Procesamiento completado",
                newProducts: validProducts,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al procesar el archivo: " + error.message });
        }
    };
    lowStockProducts = async (req, res) => {
        try {
            const { organizationId } = req.user;
            const products = await product_model_1.ProductModel.find({
                organizacion: organizationId,
                stock: { $lte: 5 },
            });
            res.status(200).json({ products });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener los productos", error });
        }
    };
}
exports.ProductController = ProductController;
//# sourceMappingURL=controller.js.map