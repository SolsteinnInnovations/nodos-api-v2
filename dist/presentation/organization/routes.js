"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class OrganizationRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.OrganizationController();
        router.post('/', controller.createOrganization);
        router.get('/', controller.getOrganizations);
        return router;
    }
}
exports.OrganizationRoutes = OrganizationRoutes;
//# sourceMappingURL=routes.js.map