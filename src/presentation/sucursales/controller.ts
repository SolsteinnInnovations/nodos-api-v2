import { Request, Response } from "express";
import { SucursalModel } from "../../data/mongo/models/sucursal.model";
import { ClerkProvider } from "../../providers/ClerkProvider";
import { ValidarPlanSucursal } from "../../helpers/validatePlan";

export class SucursalController {
  constructor() { }

  private getAvailableSucursales = async (organizationId: string) => {
    return await SucursalModel.find({ organizacion: organizationId, habilitadoParaVender: true });
  };

  createSucursal = async (req: Request, res: Response) => {
    try {

      const { descripcion, habilitadoParaVender = true, ...rest } = req.body;
      const { organizationId } = req.user; // Obtener organizationId del usuario logueado

      // count sucursales quantity
      if (habilitadoParaVender) {
        try {
          const sucursales = await this.getAvailableSucursales(organizationId);
          const { privateMetadata } = await ClerkProvider.getOrganizationClerk(organizationId);

          // ValidarPlanSucursal(privateMetadata.plan, sucursales.length);
        } catch (error) {
          res.status(400).json({
            message: error.message || "Error al contar las sucursales"
          });
          return;
        }

      }

      // Crear la sucursal con el organizationId
      const descripcionExists = await SucursalModel.findOne({ descripcion });

      if (descripcionExists) {
        res
          .status(400)
          .json({ msg: "La sucursal con esta descripción ya existe" });
        return;
      }

      const newSucursal = await SucursalModel.create({
        descripcion,
        habilitadoParaVender,
        organizacion: organizationId,
        ...rest,
      });

      res.status(200).json({
        msg: "Sucursal creada correctamente",
        newSucursal,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al crear la sucursal", error });
    }
  };

  getSucursales = async (req: Request, res: Response) => {
    try {
      const sucursales = await SucursalModel.find({
        organizacion: req.user.organizationId
      });
      res.status(200).json({ sucursales });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las sucursales", error });
    }
  };

  getSucursal = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sucursal = await SucursalModel.findById(id);
      if (!sucursal) {
        res.status(404).json({ msg: "La sucursal no existe" });
        return;
      }
      res.status(200).json({ sucursal });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la sucursal", error });
    }
  };

  updateSucursal = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { descripcion, ...rest } = req.body;
      const updateData: any = { ...rest };

      if (descripcion)
        updateData.descripcion = descripcion.toLowerCase().trim();

      const sucursal = await SucursalModel.findByIdAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      )
      if (sucursal) {
        res.status(200).json({ sucursal, msg: "Sucursal  actualizado correctamente" });
      } else {
        res.status(404).json({ message: 'Sucursal not found' });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el Sucursal", error });
    }
  };


  deleteSucursal = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sucursal = await SucursalModel.findByIdAndDelete(id);
      if (!sucursal) {
        res.status(404).json({ msg: "La sucursal no existe" });
        return;
      }
      res.status(200).json({ msg: "Sucursal eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la sucursal", error });
    }
  };
}
