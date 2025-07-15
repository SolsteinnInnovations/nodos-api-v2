import { Request, Response, NextFunction } from 'express';



export function validarAdminRole(...validRoles: string[]): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
        
        const user = req.user; // Tipo extendido de `Request`
        if (!user) {
          res.status(401).json({ message: 'User not authenticated' });
          return; // Importante: Finaliza la ejecución aquí
        }
      
        const { permisos } = user;
        const keyPermisos = Object.keys(permisos);
        const tipoAdmin = keyPermisos.includes('Admin') ? ['Admin'] : ['User'] ;

        if (!validRoles.includes(tipoAdmin[0])) {
          res.status(403).json({ message: 'Access denied' });
          return; // Importante: Finaliza la ejecución aquí
        }
    next();
  };
}


