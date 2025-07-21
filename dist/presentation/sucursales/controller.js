"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucursalController = void 0;
const sucursal_model_1 = require("../../data/mongo/models/sucursal.model");
const ClerkProvider_1 = require("../../providers/ClerkProvider");
class SucursalController {
    constructor() { }
    getAvailableSucursales = async (organizationId) => {
        return await sucursal_model_1.SucursalModel.find({ organizacion: organizationId, habilitadoParaVender: true });
    };
    createSucursal = async (req, res) => {
        try {
            const { descripcion, habilitadoParaVender = true, ...rest } = req.body;
            const { organizationId } = req.user; // Obtener organizationId del usuario logueado
            // count sucursales quantity
            if (habilitadoParaVender) {
                try {
                    const sucursales = await this.getAvailableSucursales(organizationId);
                    const { privateMetadata } = await ClerkProvider_1.ClerkProvider.getOrganizationClerk(organizationId);
                    // ValidarPlanSucursal(privateMetadata.plan, sucursales.length);
                }
                catch (error) {
                    res.status(400).json({
                        message: error.message || "Error al contar las sucursales"
                    });
                    return;
                }
            }
            // Crear la sucursal con el organizationId
            const descripcionExists = await sucursal_model_1.SucursalModel.findOne({ descripcion });
            if (descripcionExists) {
                res
                    .status(400)
                    .json({ msg: "La sucursal con esta descripción ya existe" });
                return;
            }
            const newSucursal = await sucursal_model_1.SucursalModel.create({
                descripcion,
                habilitadoParaVender,
                organizacion: organizationId,
                ...rest,
            });
            res.status(200).json({
                msg: "Sucursal creada correctamente",
                newSucursal,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la sucursal", error });
        }
    };
    getSucursales = async (req, res) => {
        try {
            const sucursales = await sucursal_model_1.SucursalModel.find({
                organizacion: req.user.organizationId
            });
            res.status(200).json({ sucursales });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener las sucursales", error });
        }
    };
    getSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const sucursal = await sucursal_model_1.SucursalModel.findById(id);
            if (!sucursal) {
                res.status(404).json({ msg: "La sucursal no existe" });
                return;
            }
            res.status(200).json({ sucursal });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener la sucursal", error });
        }
    };
    updateSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const { ...rest } = req.body;
            const updateData = { ...rest };
            const sucursal = await sucursal_model_1.SucursalModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });
            if (sucursal) {
                res.status(200).json({ sucursal, msg: "Sucursal  actualizado correctamente" });
            }
            else {
                res.status(404).json({ message: 'Sucursal not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el Sucursal", error });
        }
    };
    deleteSucursal = async (req, res) => {
        try {
            const { id } = req.params;
            const sucursal = await sucursal_model_1.SucursalModel.findByIdAndDelete(id);
            if (!sucursal) {
                res.status(404).json({ msg: "La sucursal no existe" });
                return;
            }
            res.status(200).json({ msg: "Sucursal eliminada correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la sucursal", error });
        }
    };
}
exports.SucursalController = SucursalController;
//# sourceMappingURL=controller.js.map