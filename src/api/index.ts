import path from 'path';
import dotenv from 'dotenv';
import { Server } from '../presentation/server';
import { MongoDatabase } from "../data/mongo/mongo-database";
import { AppRoutes } from '../presentation/routes';
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
    
});


(async () => {
    
    main();

})();

async function main() {
    await MongoDatabase.connect({
        dbName: 'Solsteinn_test',
        mongoUrl: 'mongodb+srv://solsteinninnovations:Exito2024!@solsteinn.8ys4b.mongodb.net/Solsteinn_test?retryWrites=true&w=majority&appName=Solsteinn',
    });
    
    const server = new Server({
        port: 3001,
        routes: AppRoutes.routes,
        public_path:'./public'
    });
    
    server.start();
    
}
