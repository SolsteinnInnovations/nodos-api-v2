import mongoose, { Schema } from "mongoose";


const clientInvoiceSchema = new mongoose.Schema(
  {
   
    numeroFactura: {
      type: String,
      required: [true, "Numero Factura is required"],
    },
    detalles: {
      type: String,
      required: [false],
    },
    descuento: {
      type: Number,
      required: [false],
    },
    organizacion: {
      type: String,
      required: [true, "Organizacion is required"],
    },
    recargo: {
      type: Number,
      required: [false],
    },
    subtotal: {
      type: Number,
      required: [false, "Organizacion is required"],
    },
    total: {
      type: Number,
      required: [false],
    },
    tipoFactura: {
      type: String,
      required: [false],
    },
    metodosDePago: {
      type: Array,
      required: [true],
    },
    condicionIva: {
      type: String,
      required: [false],
    },
    items: {
      type: Array,
      required: [false],
    },
    fecha: {
      type: Date,
      required: [false],
    },
    fechaPago: {
      type: Date,
      required: [false],
    },
    estado: {
      type: Boolean,
      required: [false],
    },
    caja: {
      type: Schema.Types.ObjectId,
      ref: "dailyCash",
      required: [false],
    },
    idSucursal: {
      type: Schema.Types.ObjectId,
      ref: "Sucursal",
      required: [false],
    },
    usuario: {
      type: String,
      required: [false],
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [false],
    },
  },
  {
    timestamps: true, // Para agregar createdAt y updatedAt automáticamente
  }
);

clientInvoiceSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._v;
    delete ret.uid;
 
  },
});

export const clientInvoiceModel = mongoose.model(
  "clientInvoice",
  clientInvoiceSchema
);
