import { Request, Response } from "express";
import { DailyCashModel } from "../../data/mongo/models/dailyCash.model";
import { IDailyCash } from "../../interfaces/IDailyCash.interface";
import { SucursalModel } from "../../data/mongo/models/sucursal.model";
export class DailyCashController {
  // Crear una nueva caja diaria
  createDailyCash = async (req: Request, res: Response) => {
    try {
      const { importeInicioCaja, fechaHoraInicio, idUsuario, ...rest } =
        req.body;
      const { sucursalId, id, organizationId } = req.user;

      // Verificar si ya existe una caja abierta para la sucursal
      const existingCash = await DailyCashModel.findOne({
        idSucursal: sucursalId,
        estado: true,
        organizacion: organizationId,
      });
      const sucursalExists= await SucursalModel.findOne({
        _id: sucursalId,
        organizacion: organizationId,
      }).select("-organizacion")
      console.log("Caja abierta encontrada:", existingCash);

      if (existingCash) {
        res
          .status(400)
          .json({ msg: "Ya existe una caja abierta para esta sucursal" });
        return;
      }
      
     if(!sucursalExists)
      {
        res.status(404).json({ msg: "Sucursal no encontrada" });
        return;
      }

      const newDailyCash = await DailyCashModel.create({
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
    } catch (error) {
      res.status(500).json({ message: "Error al crear la caja diaria", error });
    }
  };

  // Obtener todas las cajas diarias
  getDailyCashes = async (req: Request, res: Response) => {
    try {
      const { organizationId, sucursalId } = req.user;

      // Filtrar cajas por organización
      const dailyCashes = await DailyCashModel.find({
        organizacion: organizationId,
        idSucursal: sucursalId,
      });

      res.status(200).json({ dailyCashes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las cajas diarias", error });
    }
  };

  // Obtener una caja diaria por ID
  getDailyCash = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId, sucursalId } = req.user;

      const dailyCash = await DailyCashModel.findOne({
        _id: id,
        organizacion: organizationId,
        idSucursal: sucursalId,
      });

      if (!dailyCash) {
        res.status(404).json({ msg: "Caja diaria no encontrada" });
        return;
      }

      res.status(200).json({ dailyCash });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la caja diaria", error });
    }
  };

  // Actualizar una caja diaria
  updateDailyCash = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId, sucursalId } = req.user;
      const updateData = req.body;

      // Verificar si la caja existe y pertenece a la organización
      const dailyCash = await DailyCashModel.findOne({
        _id: id,
        organizacion: organizationId,
        idSucursal: sucursalId,
      });
      if (!dailyCash) {
        res.status(404).json({ msg: "Caja diaria no encontrada" });
        return;
      }

      const updatedDailyCash = await DailyCashModel.findOneAndUpdate(
        { _id: id, organizacion: organizationId, idSucursal: sucursalId },
        updateData,
        { new: true }
      );

      res.status(200).json({
        msg: "Caja diaria actualizada correctamente",
        updatedDailyCash,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar la caja diaria", error });
    }
  };

  // Cerrar una caja diaria
  closeDailyCash = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { organizationId, sucursalId } = req.user;
      const {
        fechaHoraCierre,
        importeCierreCaja,
        validacionTotalEfectivo,
        ...rest
      } = req.body;

      // Verificar si la caja existe y pertenece a la organización
      const dailyCash = await DailyCashModel.findOne({
        _id: id,
        organizacion: organizationId,
        estado: true,
        idSucursal: sucursalId,
      });

      if (!dailyCash) {
        res.status(404).json({ msg: "Caja diaria no encontrada o ya cerrada" });
        return;
      }

      const updatedDailyCash = await DailyCashModel.findOneAndUpdate(
        { _id: id, organizacion: organizationId, idSucursal: sucursalId },
        {
          fechaHoraCierre,
          importeCierreCaja,
          validacionTotalEfectivo,
          estado: false, // Marcar como cerrada
          ...rest,
        },
        { new: true }
      );

      res.status(200).json({
        msg: "Caja diaria cerrada correctamente",
        updatedDailyCash,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al cerrar la caja diaria", error });
    }
  };

  getLastDailyCash = async (req: Request, res: Response): Promise<void> => {
    try {
      const { organizationId, sucursalId } = req.user;

      const query: any = {
        organizacion: organizationId,
        idSucursal: sucursalId,
      };

      console.log("organizationId", organizationId);
      console.log("sucursalId", sucursalId);

      const lastDailyCash = await DailyCashModel.findOne(query)
        .sort({ createdAt: -1 }) // Orden descendente por fecha de creación
        .limit(1);

      if (!lastDailyCash) {
        res.status(404).json({ msg: "No se encontró ninguna caja diaria" });
        return;
      }

      res.status(200).json({ lastDailyCash });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la última caja diaria",
        error,
      });
    }
  };

  addTrasanctionToDailyCash = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { organizationId, sucursalId } = req.user;
      const { ...tx } = req.body;

      // Verificar si la caja existe y pertenece a la organización
      const dailyCash = (await DailyCashModel.findOne({
        _id: id,
        organizacion: organizationId,
        idSucursal: sucursalId,
      })) as IDailyCash;

      if (!dailyCash) {
        res.status(404).json({ msg: "Caja diaria no encontrada" });
        return;
      }

      // Agregar la transacción al array de transacciones

      dailyCash.transacciones?.push(tx);

      if (tx.tipo === "Ingreso") {
        dailyCash.totalVentas += tx.monto;
      } else {
        dailyCash.totalGastos += tx.monto;
      }

      await dailyCash.save();
      res.status(200).json({
        msg: "Transacción agregada correctamente",
        dailyCash,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error al agregar la transacción:${error.message}` });
      return;
    }
  };
}
