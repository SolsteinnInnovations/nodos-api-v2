import mongoose from "mongoose";
import { Request, Response } from "express";
import { PersonModel } from "../../data/mongo/models/person.model";

export class PersonController {
    constructor() { }

    createPerson = async (req: Request, res: Response) => {
        try {
            const person = req.body;
            const newPerson = await PersonModel.create({
                ...person,
                organizacion: req.user.organizationId,
            });
            res.status(200).json({ msg: "Persona creada correctamente", newPerson });
        } catch (error) {
            res.status(500).json({ message: "Error al crear la persona", error });
        }
    }

    getPersons = async (req: Request, res: Response) => {
        try {
            const persons = await PersonModel.find({
                organizacion: req.user.organizationId,
            });
            res.status(200).json({ persons });
        } catch (error) {
            res.status(500).json({ message: "Error al obtener las personas", error });
        }
    }

    async getPerson(req: Request, res: Response) :Promise<void> {
        const { term } = req.params;

        try {
            let person;
            if (mongoose.Types.ObjectId.isValid(term)) {
                // Search by _id if term is a valid ObjectId
                person = await PersonModel.findById(term);
            } else {
                // Otherwise, search by dni
                person = await PersonModel.findOne({ dni: term });
            }

            if (!person) {
                res.status(404).json({
                    message: "Persona no encontrada",
                });
                return 
            }

            res.json(person);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener la persona",
                error,
            });
        }
    }


    updatePerson = async (req: Request, res: Response): Promise<void> => {
        try {
            const { term } = req.params; // Use "term" instead of "id"
            const person = req.body;

            let query;
            if (mongoose.Types.ObjectId.isValid(term)) {
                // Search by _id if term is a valid ObjectId
                query = { _id: term, organizacion: req.user.organizationId };
            } else {
                // Otherwise, search by dni
                query = { dni: term, organizacion: req.user.organizationId };
            }

            console.log("Query:", query); // Debugging query
            console.log("Organization ID:", req.user.organizationId); // Debugging organization ID

            const updatedPerson = await PersonModel.findOneAndUpdate(
                query,
                person,
                { new: true }
            );

            if (!updatedPerson) {
                res.status(404).json({ message: "Persona no encontrada o no pertenece a la organización" });
                return;
            }

            res.status(200).json({ msg: "Persona actualizada correctamente", updatedPerson });
        } catch (error) {
            console.error("Error in updatePerson:", error); // Log the error
            res.status(500).json({ message: "Error al actualizar la persona", error });
        }
    }

    deletePerson = async (req: Request, res: Response): Promise<void> => {
        try {
            const { term } = req.params; // Use "term" instead of "id"

            const query = mongoose.Types.ObjectId.isValid(term)
                ? { _id: term, organizacion: req.user.organizationId }
                : { dni: term, organizacion: req.user.organizationId };

            const deletedPerson = await PersonModel.findOneAndDelete(query);

            if (!deletedPerson) {
                 res.status(404).json({ message: "Persona no encontrada o no pertenece a la organización" });
                 return
            }

            res.status(200).json({ msg: "Persona eliminada correctamente", deletedPerson });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la persona", error });
        }
    }

}