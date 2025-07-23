import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    razonSocial : {
        type: String,
        required: [true, 'Razon social is required']
    },
    InicioActividades: {
        type: Date,
    },
    estado: {
        type: Boolean,
        default: true
    },
    IVA: {
        type: String,
        default: 'Responsable Inscripto'
    },
    cuit: {
        type: String,
        required: [true, 'CUIT is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    telefono: {
        type: String,
        default: false
    },
    domicilio: {
        type: String,
        default: false
    },
    localidad: {
        type: String,
        default: false
    },
    organizacion: {
        type: String,
        required: [true, 'Organizacion is required']
    }
}, {
    timestamps: true
}

);


export const SupplierModel = mongoose.model('Supplier', supplierSchema);