"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const organizationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
    },
    createdBy: {
        type: String,
        required: [true, "Created by is required"],
    },
    maxAllowedMemberships: {
        type: Number,
        required: [true, "Max allowed memberships is required"],
        min: [1, "Minimum allowed memberships is 1"],
        max: [20, "Maximum allowed memberships is 20"]
    }
}, {
    timestamps: true,
});
exports.OrganizationModel = mongoose_1.default.model("Organization", organizationSchema);
//# sourceMappingURL=organization.model.js.map