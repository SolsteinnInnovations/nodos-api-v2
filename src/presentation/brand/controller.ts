import { Request, Response } from 'express';
import { BrandModel } from '../../data/mongo/models/brand.model';
import { IBrand } from '../../interfaces/IBrand.interface';

export class BrandController {
    constructor() {}

    createBrand = async (req: Request, res: Response) => {
        try {
            const { descripcion,nombre }:IBrand = req.body;
            const {organizationId} = req.user
            const newdescripcion= descripcion.toLowerCase().trim();
            const newNombre = nombre.toUpperCase().trim();
            const existBrand = await BrandModel.findOne({
                nombre:newNombre
            })
            
            if(existBrand) {
                res.status(400).json({
                    msg: "La marca ingresada ya esta registrada",
                    newNombre
                });
                return;
            }

            const newBrand = await BrandModel.create({
                descripcion: newdescripcion,
                nombre: newNombre,
                organizacion: organizationId,
            });

            res.status(200).json({
                msg: "Marca creada correctamente",
                newBrand
            });
            return;
        } catch (error) {
            console.error('Error creating brand:', error);
            res.status(500).json({ message: "Error al crear la marca", error });
            return;
        }
    };

  getBrand = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {organizationId} = req.user
      const brand = await BrandModel.findOne({
        _id: id,
        organizacion: organizationId,
      });
      if (!brand) {
        res.status(404).json({ message: "Marca no encontrada" });
        return;
      }
      res.status(200).json({ brand });
    } catch (error) {
      console.error('Error getting brand:', error);
      res.status(500).json({ message: "Error al obtener la marca", error });
      return;
    }
  }


    getBrands = async (req: Request, res: Response) => {
        try {
            const {organizationId} = req.user

            const brands = await BrandModel.find({
                    organizacion: organizationId,
                  });
           
            res.status(200).json({ brands });
            return;
        } catch (error) {
            console.error('Error getting brands:', error);
            res.status(500).json({ message: "Error al obtener las marcas", error });
            return;
        }
    };

    updateBrand = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
            const updateData = req.body;
    
            const updatedBrand = await BrandModel.findOneAndUpdate(
                { _id: id, organizacion: organizationId },
                updateData,
                { new: true }
            );
    
            if (!updatedBrand) {
                res.status(404).json({ message: "Marca no encontrada" });
                return;
            }
    
            res.status(200).json({ msg: "Marca actualizada correctamente", updatedBrand });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar la marca", error });
        }
    };



    deleteBrand = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { organizationId } = req.user;
    
            const deletedBrand = await BrandModel.findOneAndDelete(
                { _id: id, organizacion: organizationId }
            );
    
            if (!deletedBrand) {
                res.status(404).json({ message: "Marca no encontrada" });
                return;
            }
    
            res.status(200).json({ msg: "Marca eliminada correctamente", deletedBrand });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la marca", error });
        }
    };
}