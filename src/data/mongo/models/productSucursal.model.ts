import mongoose, { Model } from "mongoose";
import { IProductSucursalDocument } from "../../../interfaces/IProductSucursal.interface"
const productSucursal = new mongoose.Schema(
    {
        stock: {
            type: Number,
            required: [true, "stock is required"],
        },
        habilitado: {
            type: Boolean,
            default: true,
        },
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        precioCosto:{
            type: Number,
            required: [true, "Precio is required"],
        },
        precioVentaSucursal: {
            type: Number,
            required: [true, "Precio venta is required"],
        },
        sucursal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sucursal",
            required: true,
        },
        organizacion: {
            type: String,
            required: [true, "Organización is required"],
        }

    }, 
    {
        timestamps: true,
    }
)


export const ProductSucursalModel: Model<IProductSucursalDocument> = mongoose.model<IProductSucursalDocument>(
  "ProductSucursal",
  productSucursal
);