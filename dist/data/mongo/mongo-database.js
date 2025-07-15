"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDatabase {
    static async connect(options) {
        const { mongoUrl, dbName } = options;
        try {
            await mongoose_1.default.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log('Database connected!');
            return true;
        }
        catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
    static async disconnect() {
        await mongoose_1.default.disconnect();
    }
}
exports.MongoDatabase = MongoDatabase;
//# sourceMappingURL=mongo-database.js.map