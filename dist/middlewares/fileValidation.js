"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = fileValidation;
function fileValidation(...extensionValida) {
    return (req, res, next) => {
        if (!req.files) {
            res.status(400).json({ message: "No se proporcionó un archivo" });
            return;
        }
        const file = req.files.File;
        const extensionFile = file.name.split('.')[1];
        if (!extensionValida.includes(extensionFile)) {
            res.status(400).json({ message: `El archivo debe ser de tipo ${extensionValida.join(', ')}` });
            return;
        }
        next();
    };
}
//# sourceMappingURL=fileValidation.js.map