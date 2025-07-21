"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyCashController = void 0;
const dailyCash_model_1 = require("../../data/mongo/models/dailyCash.model");
const sucursal_model_1 = require("../../data/mongo/models/sucursal.model");
class DailyCashController {
    // Crear una nueva caja diaria
    createDailyCash = async (req, res) => {
        try {
            const { importeInicioCaja, fechaHoraInicio, idUsuario, ...rest } = req.body;
            const { sucursalId, id, organizationId } = req.user;
            // Verificar si ya existe una caja abierta para la sucursal
            const existingCash = await dailyCash_model_1.DailyCashModel.findOne({
                idSucursal: sucursalId,
                estado: true,
                organizacion: organizationId,
            });
            const sucursalExists = await sucursal_model_1.SucursalModel.findOne({
                _id: sucursalId,
                organizacion: organizationId,
            }).select("-organizacion");
            console.log("Caja abierta encontrada:", existingCash);
            if (existingCash) {
                res
                    .status(400)
                    .json({ msg: "Ya existe una caja abierta para esta sucursal" });
                return;
            }
            if (!sucursalExists) {
                res.status(404).json({ msg: "Sucursal no encontrada" });
                return;
            }
            const newDailyCash = await dailyCash_model_1.DailyCashModel.create({
                importeInicioCaja,
                idSucursal: sucursalExists,
                fechaHoraInicio,
                idUsuario: id,
                organizacion: organizationId,
                totalCaja: importeInicioCaja,
                ...rest,
            });
            res.status(201).json({
                msg: "Caja diaria creada correctamente",
                newDailyCash,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la caja diaria", error });
        }
    };
    // Obtener todas las cajas diarias
    getDailyCashes = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user;
            // Filtrar cajas por organización
            const dailyCashes = await dailyCash_model_1.DailyCashModel.find({
                organizacion: organizationId,
                idSucursal: sucursalId,
            });
            res.status(200).json({ dailyCashes });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener las cajas diarias", error });
        }
    };
    // Obtener una caja diaria por ID
    getDailyCash = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const dailyCash = await dailyCash_model_1.DailyCashModel.findOne({
                _id: id,
                organizacion: organizationId,
                idSucursal: sucursalId,
            });
            if (!dailyCash) {
                res.status(404).json({ msg: "Caja diaria no encontrada" });
                return;
            }
            res.status(200).json({ dailyCash });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al obtener la caja diaria", error });
        }
    };
    // Actualizar una caja diaria
    updateDailyCash = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const updateData = req.body;
            // Verificar si la caja existe y pertenece a la organización
            const dailyCash = await dailyCash_model_1.DailyCashModel.findOne({
                _id: id,
                organizacion: organizationId,
                idSucursal: sucursalId,
            });
            if (!dailyCash) {
                res.status(404).json({ msg: "Caja diaria no encontrada" });
                return;
            }
            const updatedDailyCash = await dailyCash_model_1.DailyCashModel.findOneAndUpdate({ _id: id, organizacion: organizationId, idSucursal: sucursalId }, updateData, { new: true });
            res.status(200).json({
                msg: "Caja diaria actualizada correctamente",
                updatedDailyCash,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al actualizar la caja diaria", error });
        }
    };
    // Cerrar una caja diaria
    closeDailyCash = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const { fechaHoraCierre, importeCierreCaja, validacionTotalEfectivo, ...rest } = req.body;
            // Verificar si la caja existe y pertenece a la organización
            const dailyCash = await dailyCash_model_1.DailyCashModel.findOne({
                _id: id,
                organizacion: organizationId,
                estado: true,
                idSucursal: sucursalId,
            });
            if (!dailyCash) {
                res.status(404).json({ msg: "Caja diaria no encontrada o ya cerrada" });
                return;
            }
            const updatedDailyCash = await dailyCash_model_1.DailyCashModel.findOneAndUpdate({ _id: id, organizacion: organizationId, idSucursal: sucursalId }, {
                fechaHoraCierre,
                importeCierreCaja,
                validacionTotalEfectivo,
                estado: false, // Marcar como cerrada
                ...rest,
            }, { new: true });
            res.status(200).json({
                msg: "Caja diaria cerrada correctamente",
                updatedDailyCash,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error al cerrar la caja diaria", error });
        }
    };
    getLastDailyCash = async (req, res) => {
        try {
            const { organizationId, sucursalId } = req.user;
            const query = {
                organizacion: organizationId,
                idSucursal: sucursalId,
            };
            console.log("organizationId", organizationId);
            console.log("sucursalId", sucursalId);
            const lastDailyCash = await dailyCash_model_1.DailyCashModel.findOne(query)
                .sort({ createdAt: -1 }) // Orden descendente por fecha de creación
                .limit(1);
            if (!lastDailyCash) {
                res.status(404).json({ msg: "No se encontró ninguna caja diaria" });
                return;
            }
            res.status(200).json({ lastDailyCash });
        }
        catch (error) {
            res.status(500).json({
                message: "Error al obtener la última caja diaria",
                error,
            });
        }
    };
    addTrasanctionToDailyCash = async (req, res) => {
        try {
            const { id } = req.params;
            const { organizationId, sucursalId } = req.user;
            const { ...tx } = req.body;
            // Verificar si la caja existe y pertenece a la organización
            const dailyCash = (await dailyCash_model_1.DailyCashModel.findOne({
                _id: id,
                organizacion: organizationId,
                idSucursal: sucursalId,
            }));
            if (!dailyCash) {
                res.status(404).json({ msg: "Caja diaria no encontrada" });
                return;
            }
            // Agregar la transacción al array de transacciones
            dailyCash.transacciones?.push(tx);
            if (tx.tipo === "Ingreso") {
                dailyCash.totalVentas += tx.monto;
            }
            else {
                dailyCash.totalGastos += tx.monto;
            }
            await dailyCash.save();
            res.status(200).json({
                msg: "Transacción agregada correctamente",
                dailyCash,
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: `Error al agregar la transacción:${error.message}` });
            return;
        }
    };
}
exports.DailyCashController = DailyCashController;
//# sourceMappingURL=controller.js.map