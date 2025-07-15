"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarPlanSucursal = void 0;
const ValidarPlanSucursal = (plan, cantidadSucursales) => {
    if (plan === "basico" && cantidadSucursales === 1) {
        throw new Error("El plan basico solo permite una sucursal");
    }
    if (plan === "intermedio" && cantidadSucursales === 2) {
        throw new Error("El plan intermedio solo permite hasta 3 sucursales");
    }
};
exports.ValidarPlanSucursal = ValidarPlanSucursal;
//# sourceMappingURL=validatePlan.js.map