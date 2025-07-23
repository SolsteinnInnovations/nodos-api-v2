"use strict";
//TO DO REFACTORIZAR SUpplier INVOICE
Object.defineProperty(exports, "__esModule", { value: true });
// import mongoose, { Schema } from "mongoose";
// import { supplierCurrentAccountModel } from "./supplierCurrentAccount.model"; // Importar el modelo de cuenta corriente de proveedores
// const supplierInvoiceSchema = new mongoose.Schema(
//   {
//     idProveedor: {
//       type: Schema.Types.ObjectId,
//       ref: "Supplier",
//       required: [true, "El ID del proveedor es requerido"],
//     },
//     estado: {
//       type: Boolean,
//       default: true,
//     },
//     fechaPago: {
//       type: Date,
//     },
//     numeroFactura: {
//       type: String,
//       required: [true, "El número de factura es requerido"],
//     },
//     cantidadTotal: {
//       type: Number,
//       required: [true, "La cantidad total es requerida"],
//     },
//     importe: {
//       type: Number,
//       required: [true, "El importe es requerido"],
//     },
//     fechaFactura: {
//       type: Date,
//       required: [true, "La fecha de la factura es requerida"],
//     },
//     items: {
//       type: Array,
//       required: [true, "Los items son requeridos"],
//     },
//     metodosDePago: {
//       type: Array,
//       default: null,
//     },
//     idSucursal: {
//       type: Schema.Types.ObjectId,
//       ref: "Sucursal",
//       required: [true, "El ID de la sucursal es requerido"],
//     },
//     organizacion: {
//       type: String,
//       required: [true, "La organizacion es requerida"],
//     }
//   },
//   {
//     timestamps: true, // Agrega automáticamente createdAt y updatedAt
//   }
// );
// supplierInvoiceSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     delete ret._v;
//     delete ret.uid;
//   },
// });
// // Middleware post-save para crear una cuenta corriente si esCuentaCorriente es true
// supplierInvoiceSchema.post("save", async function (doc, next) {
//   try {
//     // Verificar si esCuentaCorriente es true
//     if (doc) {
//       // Crear un nuevo registro en supplierCurrentAccount
//       const nuevaCuentaCorriente = await supplierCurrentAccountModel.create({
//         importe: doc.importe || 0, // Asignar el importe de la factura
//         deudaTotal: doc.importe || 0, // Inicialmente, deudaTotal es igual al importe
//         factura: doc._id, // Asociar la factura actual
//         estado: false, // Estado inicial como false (no pagado)
//         fechaPago: doc.fechaPago || null, // Asignar fecha de pago si está presente
//         proveedor: doc.idProveedor || null, // Asociar el proveedor
//         organizacion: doc.organizacion, // Asociar la organización
//       });
//       console.log(
//         `Cuenta corriente creada correctamente para la factura de proveedor con ID ${doc._id}`
//       );
//       // Actualizar el stock de los productos
//       const ProductModel = require("./product.model").ProductModel; // Importar el modelo de productos
//       if (Array.isArray(doc.items)) {
//         for (const item of doc.items) {
//           if (!item.codigo) {
//             console.error(
//               `El campo "codigo" está ausente en el item: ${JSON.stringify(item)}`
//             );
//             throw new Error(`El campo "codigo" está ausente en el item.`);
//           }
//           // Buscar el producto en la base de datos
//           const productoExistente = await ProductModel.findOne({
//             codigo: item.codigo,
//           });
//           if (productoExistente) {
//             // Si el producto ya existe, sumar el stock
//             const nuevoStock = productoExistente.stock + item.cantidad;
//             await productoExistente.updateOne({ stock: nuevoStock });
//             console.log(
//               `Stock actualizado para producto: ${productoExistente.codigo}, Nuevo stock: ${nuevoStock}`
//             );
//           } else {
//             // Si el producto no existe, crear un nuevo registro
//             const nuevoProducto = {
//               codigo: item.codigo,
//               nombre: item.nombre || "Producto sin nombre",
//               descripcion: item.descripcion || "Sin descripción",
//               precioLista: item.precioVenta || 0,
//               precioVenta: item.precioVenta || 0,
//               stock: item.cantidad || 0,
//               poseeIva: item.iva ? true : false,
//               iva: item.iva || 0,
//               categoria: item.categoria || null,
//                 marca: item.marca, 
//               sucursales: doc.idSucursal
//                 ? [{ idSucursal: doc.idSucursal, cantidad: item.cantidad }]
//                 : [],
//               organizacion: doc.organizacion,
//             };
//             console.log("Creando nuevo producto:", nuevoProducto);
//             await ProductModel.create(nuevoProducto);
//           }
//         }
//       }
//     }
//     next();
//   } catch (error) {
//     console.error(
//       `Error al procesar la factura de proveedor con ID ${doc._id}:`,
//       error
//     );
//     next(error);
//   }
// });
// export const SupplierInvoiceModel = mongoose.model(
//   "SupplierInvoice",
//   supplierInvoiceSchema
// );
//# sourceMappingURL=supplierInvoice.model.js.map