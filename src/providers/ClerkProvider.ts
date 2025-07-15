
import { clerkClient } from "@clerk/clerk-sdk-node";
import { IClerkUserData } from "../interfaces/IClerkUserData.interface";
import { toClerkUserDTO } from "../mappers/clerk.mapper";

export class ClerkProvider {
    constructor() { }

    static validateUserClerk = async (email: string, password: string) => {

        // validamos si el email existe en clerk
        try {
            const clerkUserArray = await clerkClient.users.getUserList({
                emailAddress: [email],
            });
          
            const clerkUser = clerkUserArray[0];
    
            if (!clerkUser) {
                throw new Error('El usuario no existe en clerk')         
            }
          
            // validamos si esta bloqueado o baneado sacaron el lock, asi que habria que banear
            if (clerkUser.banned) {
                throw new Error('El usuario esta bloqueado o baneado en clerk')               
            }
                     
           await clerkClient.users.verifyPassword({
                userId: clerkUser.id,
                password
            })
            
            return clerkUser;
        }catch(error){
            console.error("Error al validar el usuario en Clerk:", error.message);
            throw new Error(error);
        
        }
            
    }

    static createUserClerk = async (clerkUserData: IClerkUserData) => {
        try{
            const dto = toClerkUserDTO(clerkUserData)
            const newClerkUser = await clerkClient.users.createUser(dto);
            return newClerkUser
        }catch(error){
            throw new Error(error);
            
        }        
       
      }
    
      static getOrganizationClerk = async (organizationId: string) => {
        try {
          
            
            const organization = await clerkClient.organizations.getOrganization({organizationId});
            return organization;
        } catch (error) {
            console.error("Error al obtener la organización de Clerk:", error.message);
            throw new Error(error);
        }
      }
}