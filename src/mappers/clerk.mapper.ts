// mappers/clerk.mapper.ts
import { CreateClerkUserDTO,IClerkUserData } from "../interfaces/IClerkUserData.interface";

export function toClerkUserDTO(user: IClerkUserData): CreateClerkUserDTO {
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
