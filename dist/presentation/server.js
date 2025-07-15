"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const allowedOrigins = ['https://nodos-all-system.netlify.app/', 'http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
class Server {
    app = (0, express_1.default)();
    serverListener;
    port;
    publicPath;
    routes;
    constructor(options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }
    async start() {
        //* Middlewares
        this.app.use(express_1.default.json()); // raw
        this.app.use(express_1.default.urlencoded({ extended: true })); // x-www-form-urlencoded
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use((0, express_fileupload_1.default)());
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        //* Public Folder
        // this.app.use(express.static(this.publicPath));
        //* Routes
        this.app.use(this.routes);
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            console.log(`Swagger disponible en http://localhost:${this.port}/api-docs`);
        });
    }
    close() {
        this.serverListener?.close();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map