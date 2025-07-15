import mongoose, { Schema } from "mongoose";

const dailyCashSchema = new mongoose.Schema(
    {
      importeInicioCaja: {
        type: Number,
        required: [true, "El importe inicial de la caja es requerido"],
      },
      estado: {
        type: Boolean,
        default: true,
      },
      idSucursal: {
        type: Schema.Types.ObjectId,
        ref: "Sucursal",
        required: [false, "El ID de la sucursal es requerido"],
      },
      fechaHoraInicio: {
        type: Date,
        required: [true, "La fecha y hora de inicio es requerida"],
      },
      fechaHoraCierre: {
        type: Date,
      },
      idUsuario: {
       type:String,
       required: false,
      },
      observaciones: {
        type: String,
      },
      validacionTotalEfectivo: {
        type: Number,
      },
      importeCierreCaja: {
        type: Number,
      },
      totalVentas: {
        type: Number,
      },
      totalProductosVendidos: {
        type: Number,
      },
      totalGastos: {
        type: Number,
      },
      organizacion: {
        type: String,
        required: [true, "La organizacion es requerida"],
      },
      transacciones:{
        type: Array,
        required: false ,
      },
      totalCaja:{
        type: Number,
        required: false,
      }
      
    },
    {
      timestamps: true, // createdAt y updatedAt automáticos
    }
  );



  export const DailyCashModel = mongoose.model(
    'DailyCash', 
    dailyCashSchema
);
  