import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';


export function fileValidation(...extensionValida: string[]): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.files) {
            res.status(400).json({ message: "No se proporcionó un archivo" });
            return;
        }
        
        const file = req.files.File as UploadedFile;
        const extensionFile = file.name.split('.')[1];
        
        if(!extensionValida.includes(extensionFile)){
            res.status(400).json({ message: `El archivo debe ser de tipo ${extensionValida.join(', ')}`}) 
            return;
        }
    
        next();
    };
}
