"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Asegúrate de importar el modelo de categorías
// si ya "probaste el codigo", sacame los console.log(),
// en la linea No se encontraron categorías asociadas a la organización, agregaria: debe cargar una categoria antes de asociarla a un producto algo así
// cuando devolves un objeto, primero se devuelven las propiedades que no se hace nada, por ejemplo categoria va a abajo de IVA y no debajo de POSEEIVA -es una forrada pero es un estandar esto-
// export const validateAndFormatProducts = async (
//   organizationId: string,
//   products: IProduct[]
// ) => {
//   // const errors: string[] = [];
//   // const requiredFields = requiredFieldsProduct;
//   // // Validar si algún producto tiene categoría
//   // const hasCategories = products.some((product) => product.categoria);
//   // let categories = [];
//   // // if (hasCategories) {
//   // //   // Obtener las categorías asociadas al organizationId
//   // //   categories = await CategoryModel.find({ organizacion: organizationId });
//   // //   // Validar si existen categorías asociadas a la organización
//   // //   if (categories.length === 0) {
//   // //     errors.push("No se encontraron categorías asociadas a la organización.");
//   // //     return { validProducts: [], errors };
//   // //   }
//   }
// Validar y formatear los productos
// const validProducts = products.map((producto, index) => {
//   // Verificar campos faltantes dinámicamente
//   const missingFields = requiredFields.filter((field) => producto[field] == null);
//   if (missingFields.length > 0) {
//     errors.push(
//       `Producto en la posición ${index + 2} tiene campos faltantes: ${missingFields.join(", ")}.`
//     );
//     return null; // Retornar null para los productos inválidos
//   }
//   // Validar si la categoría del producto existe en las categorías de la organización
//   // te hago una consulta, si manda categoria Para un producto pero para otro no, da error no ? o estoy mal ? 
//   // si da error esta mal, puede mandar categoria para 1 producto y no para otro, habria que hacer un if(producto.categoria) y despuyes si usar esta lógica, fijate puede que me equivoque, saluditiadsjad
//   const matchingCategory = categories.find(cat => cat.nombre.toLowerCase() === producto.categoria?.toLowerCase());
//   if (!matchingCategory) {
//     errors.push(
//       `Producto en la posición ${index + 2} tiene una categoría inválida: ${producto.categoria}.`
//     );
//     return null;
//   }
//   // Asignar el organizationId de la categoría al producto
//   producto.categoria = matchingCategory._id.toString();
//   const { codigo, nombre, precioVenta, precioLista, iva, categoria = "" } = producto;
//   // Formatear los datos y devolver el producto validado
//   return {
//     precioLista,
//     precioVenta,
//     iva,
//     codigo: codigo.toString().trim().toLowerCase(),
//     nombre: nombre.toString().trim().toLowerCase(),
//     organizacion: organizationId,
//     poseeIva: iva ? true : false,
//     categoria,
//     ...producto,
//   } as IProduct;
// })
//   .filter((product) => product !== null); // Filtrar los productos inválidos
// return { validProducts, errors };
// };
//# sourceMappingURL=bulkValidation.js.map