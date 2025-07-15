"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const express_1 = require("@clerk/express");
const organization_model_1 = require("../../data/mongo/models/organization.model");
class OrganizationController {
    constructor() {
    }
    createOrganization = async (req, res) => {
        const { name, slug, ...rest } = req.body;
        try {
            const newOrganization = await organization_model_1.OrganizationModel.create({
                name,
                slug,
                ...rest
            });
            const clerkOrganization = await express_1.clerkClient.organizations.createOrganization({
                name,
                slug,
                ...rest
            });
            res.status(201).json({ msg: 'Organization created successfully', newOrganization });
        }
        catch (error) {
            console.error('Error creating organization:', error);
            res.status(500).json({ message: error.message, details: error.response?.data });
        }
    };
    getOrganizations = async (req, res) => {
        try {
            // const organizations = await OrganizationModel.find();
            const clerkOrganizations = await express_1.clerkClient.organizations.getOrganizationList();
            res.status(200).json({ clerkOrganizations });
        }
        catch (error) {
            console.error('Error getting organizations:', error);
            res.status(500).json({ message: error.message, details: error.response?.data });
        }
    };
}
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=controller.js.map