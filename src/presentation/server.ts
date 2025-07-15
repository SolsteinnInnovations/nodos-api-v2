import express, { Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import fileUpload from "express-fileupload";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

const allowedOrigins = ['https://nodos-all-system.netlify.app/', 'http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }
  


  async start() {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(compression())
    this.app.use(cors(corsOptions));
    this.app.use(fileUpload());

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //* Public Folder
    // this.app.use(express.static(this.publicPath));

 
    //* Routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      console.log(`Swagger disponible en http://localhost:${this.port}/api-docs`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}