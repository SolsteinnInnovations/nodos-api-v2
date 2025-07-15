"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const person_model_1 = require("../../data/mongo/models/person.model");
class PersonController {
    constructor() { }
    createPerson = async (req, res) => {
        try {
            const person = req.body;
            const newPerson = await person_model_1.PersonModel.create({
                ...person,
                organizacion: req.user.organizationId,
            });
            res.status(200).json({ msg: "Persona creada correctamente", newPerson });
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la persona", error });
        }
    };
    getPersons = async (req, res) => {
        try {
            const persons = await person_model_1.PersonModel.find({
                organizacion: req.user.organizationId,
            });
            res.status(200).json({ persons });
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener las personas", error });
        }
    };
    async getPerson(req, res) {
        const { term } = req.params;
        try {
            let person;
            if (mongoose_1.default.Types.ObjectId.isValid(term)) {
                // Search by _id if term is a valid ObjectId
                person = await person_model_1.PersonModel.findById(term);
            }
            else {
                // Otherwise, search by dni
                person = await person_model_1.PersonModel.findOne({ dni: term });
            }
            if (!person) {
                res.status(404).json({
                    message: "Persona no encontrada",
                });
                return;
            }
            res.json(person);
        }
        catch (error) {
            res.status(500).json({
                message: "Error al obtener la persona",
                error,
            });
        }
    }
    updatePerson = async (req, res) => {
        try {
            const { term } = req.params; // Use "term" instead of "id"
            const person = req.body;
            let query;
            if (mongoose_1.default.Types.ObjectId.isValid(term)) {
                // Search by _id if term is a valid ObjectId
                query = { _id: term, organizacion: req.user.organizationId };
            }
            else {
                // Otherwise, search by dni
                query = { dni: term, organizacion: req.user.organizationId };
            }
            console.log("Query:", query); // Debugging query
            console.log("Organization ID:", req.user.organizationId); // Debugging organization ID
            const updatedPerson = await person_model_1.PersonModel.findOneAndUpdate(query, person, { new: true });
            if (!updatedPerson) {
                res.status(404).json({ message: "Persona no encontrada o no pertenece a la organización" });
                return;
            }
            res.status(200).json({ msg: "Persona actualizada correctamente", updatedPerson });
        }
        catch (error) {
            console.error("Error in updatePerson:", error); // Log the error
            res.status(500).json({ message: "Error al actualizar la persona", error });
        }
    };
    deletePerson = async (req, res) => {
        try {
            const { term } = req.params; // Use "term" instead of "id"
            const query = mongoose_1.default.Types.ObjectId.isValid(term)
                ? { _id: term, organizacion: req.user.organizationId }
                : { dni: term, organizacion: req.user.organizationId };
            const deletedPerson = await person_model_1.PersonModel.findOneAndDelete(query);
            if (!deletedPerson) {
                res.status(404).json({ message: "Persona no encontrada o no pertenece a la organización" });
                return;
            }
            res.status(200).json({ msg: "Persona eliminada correctamente", deletedPerson });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la persona", error });
        }
    };
}
exports.PersonController = PersonController;
//# sourceMappingURL=controller.js.map