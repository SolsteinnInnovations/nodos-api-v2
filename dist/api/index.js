"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../presentation/server");
const mongo_database_1 = require("../data/mongo/mongo-database");
const routes_1 = require("../presentation/routes");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
(async () => {
    main();
})();
async function main() {
    await mongo_database_1.MongoDatabase.connect({
        dbName: 'Solsteinn_test',
        mongoUrl: 'mongodb+srv://solsteinninnovations:Exito2024!@solsteinn.8ys4b.mongodb.net/Solsteinn_test?retryWrites=true&w=majority&appName=Solsteinn',
    });
    const server = new server_1.Server({
        port: 3001,
        routes: routes_1.AppRoutes.routes,
        public_path: './public'
    });
    server.start();
}
//# sourceMappingURL=index.js.map