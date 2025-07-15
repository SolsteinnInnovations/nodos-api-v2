export interface IUser {
    username: string;
    email: string;
    permisos: string[];
    organizationId: string;
    sucursalId?: string;
}
export interface IClerkUserData extends IUser {
    emailAddress: string[];
    organizationId: string;
    publicMetadata?: {
        email: string;
        permisos: string[];
        username: string;
        organizationId: string;
        sucursalId?: string;
    };
    privateMetadata?: {
        email: string;
        permisos: string[];
        username: string;
        organizationId: string;
        sucursalId?: string;
    };
}
export interface CreateClerkUserDTO {
    emailAddress: string[];
    username?: string;
    firstName?: string;
    lastName?: string;
    publicMetadata?: {
        permisos: string[];
        organizationId: string;
        sucursalId?: string;
    };
    privateMetadata?: {
        permisos: string[];
        organizationId: string;
        sucursalId?: string;
    };
}
