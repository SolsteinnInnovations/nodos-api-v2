"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndFormatProducts = void 0;
const category_model_1 = require("../data/mongo/models/category.model");
const requiredFieldsProduct_1 = require("../enums/requiredFieldsProduct");
const validateAndFormatProducts = async (organizationId, products) => {
    const errors = [];
    const requiredFields = requiredFieldsProduct_1.requiredFieldsProduct;
    const hasCategories = products.some((product) => product.categoria);
    let categories = [];
    if (hasCategories) {
        categories = await category_model_1.CategoryModel.find({ organizacion: organizationId });
        if (categories.length === 0) {
            errors.push("No se encontraron categorías asociadas a la organización.");
            return { validProducts: [], errors };
        }
    }
    const validProducts = products.map((producto, index) => {
        const missingFields = requiredFields.filter((field) => producto[field] == null);
        if (missingFields.length > 0) {
            errors.push(`Producto en la posición ${index + 2} tiene campos faltantes: ${missingFields.join(", ")}.`);
            return null;
        }
        const matchingCategory = categories.find(cat => cat.nombre.toLowerCase() === producto.categoria?.toLowerCase());
        if (!matchingCategory) {
            errors.push(`Producto en la posición ${index + 2} tiene una categoría inválida: ${producto.categoria}.`);
            return null;
        }
        producto.categoria = matchingCategory._id.toString();
        const { codigo, nombre, precioVenta, precioLista, iva, categoria = "" } = producto;
        return {
            precioLista,
            precioVenta,
            iva,
            codigo: codigo.toString().trim().toLowerCase(),
            nombre: nombre.toString().trim().toLowerCase(),
            organizacion: organizationId,
            poseeIva: iva ? true : false,
            categoria,
            ...producto,
        };
    })
        .filter((product) => product !== null); // Filtrar los productos inválidos
    return { validProducts, errors };
};
exports.validateAndFormatProducts = validateAndFormatProducts;
//# sourceMappingURL=bulkValidation.js.map