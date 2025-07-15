"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierInvoiceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const supplierCurrentAccount_model_1 = require("./supplierCurrentAccount.model"); // Importar el modelo de cuenta corriente de proveedores
const supplierInvoiceSchema = new mongoose_1.default.Schema({
    idProveedor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Supplier",
        required: [true, "El ID del proveedor es requerido"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    fechaPago: {
        type: Date,
    },
    numeroFactura: {
        type: String,
        required: [true, "El número de factura es requerido"],
    },
    cantidadTotal: {
        type: Number,
        required: [true, "La cantidad total es requerida"],
    },
    importe: {
        type: Number,
        required: [true, "El importe es requerido"],
    },
    fechaFactura: {
        type: Date,
        required: [true, "La fecha de la factura es requerida"],
    },
    items: {
        type: Array,
        required: [true, "Los items son requeridos"],
    },
    metodosDePago: {
        type: Array,
        default: null,
    },
    idSucursal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sucursal",
        required: [true, "El ID de la sucursal es requerido"],
    },
    organizacion: {
        type: String,
        required: [true, "La organizacion es requerida"],
    }
}, {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
});
supplierInvoiceSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._v;
        delete ret.uid;
    },
});
// Middleware post-save para crear una cuenta corriente si esCuentaCorriente es true
supplierInvoiceSchema.post("save", async function (doc, next) {
    try {
        // Verificar si esCuentaCorriente es true
        if (doc) {
            // Crear un nuevo registro en supplierCurrentAccount
            const nuevaCuentaCorriente = await supplierCurrentAccount_model_1.supplierCurrentAccountModel.create({
                importe: doc.importe || 0, // Asignar el importe de la factura
                deudaTotal: doc.importe || 0, // Inicialmente, deudaTotal es igual al importe
                factura: doc._id, // Asociar la factura actual
                estado: false, // Estado inicial como false (no pagado)
                fechaPago: doc.fechaPago || null, // Asignar fecha de pago si está presente
                proveedor: doc.idProveedor || null, // Asociar el proveedor
                organizacion: doc.organizacion, // Asociar la organización
            });
            console.log(`Cuenta corriente creada correctamente para la factura de proveedor con ID ${doc._id}`);
            // Actualizar el stock de los productos
            const ProductModel = require("./product.model").ProductModel; // Importar el modelo de productos
            if (Array.isArray(doc.items)) {
                for (const item of doc.items) {
                    if (!item.codigo) {
                        console.error(`El campo "codigo" está ausente en el item: ${JSON.stringify(item)}`);
                        throw new Error(`El campo "codigo" está ausente en el item.`);
                    }
                    // Buscar el producto en la base de datos
                    const productoExistente = await ProductModel.findOne({
                        codigo: item.codigo,
                    });
                    if (productoExistente) {
                        // Si el producto ya existe, sumar el stock
                        const nuevoStock = productoExistente.stock + item.cantidad;
                        await productoExistente.updateOne({ stock: nuevoStock });
                        console.log(`Stock actualizado para producto: ${productoExistente.codigo}, Nuevo stock: ${nuevoStock}`);
                    }
                    else {
                        // Si el producto no existe, crear un nuevo registro
                        const nuevoProducto = {
                            codigo: item.codigo,
                            nombre: item.nombre || "Producto sin nombre",
                            descripcion: item.descripcion || "Sin descripción",
                            precioLista: item.precioVenta || 0,
                            precioVenta: item.precioVenta || 0,
                            stock: item.cantidad || 0,
                            poseeIva: item.iva ? true : false,
                            iva: item.iva || 0,
                            categoria: item.categoria || null,
                            marca: item.marca,
                            sucursales: doc.idSucursal
                                ? [{ idSucursal: doc.idSucursal, cantidad: item.cantidad }]
                                : [],
                            organizacion: doc.organizacion,
                        };
                        console.log("Creando nuevo producto:", nuevoProducto);
                        await ProductModel.create(nuevoProducto);
                    }
                }
            }
        }
        next();
    }
    catch (error) {
        console.error(`Error al procesar la factura de proveedor con ID ${doc._id}:`, error);
        next(error);
    }
});
exports.SupplierInvoiceModel = mongoose_1.default.model("SupplierInvoice", supplierInvoiceSchema);
//# sourceMappingURL=supplierInvoice.model.js.map