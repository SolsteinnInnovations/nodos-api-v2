"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAdminRole = validarAdminRole;
function validarAdminRole(...validRoles) {
    return (req, res, next) => {
        const user = req.user; // Tipo extendido de `Request`
        if (!user) {
            res.status(401).json({ message: 'User not authenticated' });
            return; // Importante: Finaliza la ejecución aquí
        }
        const { permisos } = user;
        const keyPermisos = Object.keys(permisos);
        const tipoAdmin = keyPermisos.includes('Admin') ? ['Admin'] : ['User'];
        if (!validRoles.includes(tipoAdmin[0])) {
            res.status(403).json({ message: 'Access denied' });
            return; // Importante: Finaliza la ejecución aquí
        }
        next();
    };
}
//# sourceMappingURL=userRoleValidation.js.map