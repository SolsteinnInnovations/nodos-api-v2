import mongoose, { Document } from "mongoose";
import { IProduct } from "../../../interfaces/IProduct.interface";

const productSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: [true, "Código is required"],
    },
    nombre: {
      type: String,
      required: [true, "Nombre is required"],
    },
    descripcion: {
      type: String,
      default: 'Producto sin descripción',
    },
    // stock: {
    //   type: Number,
    //   required: true,
    // },
    precioLista: {
      type: Number,
      required: [true, "Precio lista is required"],
    },
    precioVenta: {
      type: Number,
      required: [true, "Precio venta is required"],
    },
    poseeIva: {
      type: Boolean,
      default: false,
    },
    iva: {
      type: Number,
      default: 21,
    },
    marca:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    organizacion: {
      type: String,
      required: [true, "Organización is required"],
    },
    estado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);


export const ProductModel = mongoose.model<IProduct & Document>("Product", productSchema);
