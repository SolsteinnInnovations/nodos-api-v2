import { ProductSucursalModel } from './../../data/mongo/models/productSucursal.model';
import { Sucursal } from './../../interfaces/ISucursal.interface';
import { Request, Response } from "express";
import { SupplierInvoiceModel } from "../../data/mongo/models/supplierInvoice.model";
import { ProductModel } from '../../data/mongo/models/product.model';

import { ISupplierInvoice } from "../../interfaces/ISupplierInvoice.interface";
import mongoose from 'mongoose';

export class SupplierInvoiceController {
  // Crear una nueva factura de proveedor
  createSupplierInvoice = async (req: Request, res: Response): Promise<void> => {
   try {
    const { organizationId, sucursalId } = req.user;
    const { idProveedor, numeroFactura, items, ...rest } = req.body;

    // Verificar si ya existe una factura con el mismo número para el proveedor
    const invoiceExists = await SupplierInvoiceModel.findOne({
      idProveedor,
      numeroFactura,
      organizacion: organizationId,
      idSucursal: sucursalId,
    });

    if (invoiceExists) {
       res.status(400).json({
        msg: "Ya existe una factura con este número para el proveedor",
      });
      return
    }

    // Crear la nueva factura
    const newInvoice = await SupplierInvoiceModel.create({
      idProveedor,
      numeroFactura,
      organizacion: organizationId,
      idSucursal: sucursalId,
      items,
      ...rest,
    });

    // Procesar los items para actualizar stock en ProductSucursal
    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item.codigo) {
          console.error(`Item sin código: ${JSON.stringify(item)}`);
          continue; // Saltar este item
        }

        // Buscar el producto por código
        const producto = await ProductModel.findOne({
          codigo: item.codigo,
          organizacion: organizationId,
        });

        if (!producto) {
          console.error(`Producto con código ${item.codigo} no encontrado.`);
          continue;
        }

        // Buscar en ProductSucursal
        const prodSucursal = await ProductSucursalModel.findOne({
          producto: producto._id,
          sucursal: sucursalId,
        });

        if (prodSucursal) {
          // Si existe, sumar stock
          prodSucursal.stock += item.cantidad;
          await prodSucursal.save();
          console.log(`Stock actualizado en sucursal para producto ${item.codigo}`);
         } 
        // else {
        //   // Si no existe, crear nuevo registro en ProductSucursal
        //   await ProductSucursalModel.create({
        //     producto: producto._id,
        //     sucursal: sucursalId,
        //     stock: item.cantidad,
        //     organizacion: organizationId,
        //   });
        //   console.log(`Registro de producto en sucursal creado para ${item.codigo}`);
        // }
      }
    }

    res.status(201).json({
      msg: "Factura de proveedor creada correctamente",
      newInvoice,
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({
      message: "Error al crear la factura",
      error,
    });
  }
  };

  // Obtener todas las facturas de proveedores
  getSupplierInvoices = async (req: Request, res: Response) => {
    try {
      const { organizationId, sucursalId } = req.user;

      // Filtrar facturas por organización
      const invoices = await SupplierInvoiceModel.find({ organizacion: organizationId });

      res.status(200).json({message:"Facturas de proveedores:", invoices });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las facturas de proveedores", error });
    }
  };


  // Obtener una factura de proveedor por ID o término
getSupplierInvoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { term } = req.params;
    const { organizationId, sucursalId } = req.user;

    const isMongoId = mongoose.Types.ObjectId.isValid(term);

    const query = isMongoId
      ? {
          _id: term,
          organizacion: organizationId,
          idSucursal: sucursalId,
        }
      : {
          numeroFactura: term,
          organizacion: organizationId,
          idSucursal: sucursalId,
        };

    const invoice = await SupplierInvoiceModel.findOne(query);

    if (!invoice) {
      res.status(404).json({ msg: "Factura no encontrada" });
      return;
    }

    res.status(200).json({ invoice });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la factura", error });
  }
};
  // Actualizar una factura de proveedor
  updateSupplierInvoice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { numeroFactura, ...rest } = req.body;
      const {organizationId, sucursalId} = req.user;
      const updateData: any = { ...rest };

      if (numeroFactura) {
        updateData.numeroFactura = numeroFactura.trim();
      }
      
      // Verificar si la factura existe y pertenece a la organización
      const invoice: ISupplierInvoice = await SupplierInvoiceModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });
      if (!invoice) {
        res.status(404).json({ msg: "Factura no encontrada" });
        return;
      }

      if (invoice.organizacion.toString() !== organizationId) {
        res.status(403).json({ message: "No tienes permiso para actualizar esta factura" });
        return;
      }

      const updatedInvoice = await SupplierInvoiceModel.findOneAndUpdate(
        { _id: id, organizacion: organizationId , idSucursal: sucursalId },
        updateData,
        { new: true }
      );
      res.status(200).json({ msg: "Factura actualizada correctamente", invoice: updatedInvoice });

    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la factura", error });
    }
  };

  // Eliminar una factura de proveedor
  deleteSupplierInvoice = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {organizationId, sucursalId} = req.user;

      const supplierInvoice:ISupplierInvoice  = await SupplierInvoiceModel.findOne({ _id: id, organizacion: organizationId, idSucursal: sucursalId });

      if (!supplierInvoice) {
        res.status(404).json({ msg: "Factura no encontrada" });
        return;
      }

      if(supplierInvoice.organizacion.toString() !== organizationId){
        res.status(403).json({ message: "No tienes permiso para eliminar este proveedor" });
        return;
      }

      await SupplierInvoiceModel.findOneAndDelete({_id: id, organizacion: organizationId});
        res.status(200).json({msg: "Factura eliminada:", supplierInvoice});
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la factura", error });
    }
  };
}