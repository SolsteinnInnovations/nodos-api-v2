"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClerkUserDTO = toClerkUserDTO;
function toClerkUserDTO(user) {
    return {
        emailAddress: [user.email],
        username: user.username,
        publicMetadata: {
            permisos: user.permisos,
            organizationId: user.organizationId,
            sucursalId: user.sucursalId
        }
    };
}
//# sourceMappingURL=clerk.mapper.js.map