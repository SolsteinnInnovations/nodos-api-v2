import { Router } from 'express';
interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}
export declare class Server {
    readonly app: import("express-serve-static-core").Express;
    private serverListener?;
    private readonly port;
    private readonly publicPath;
    private readonly routes;
    constructor(options: Options);
    start(): Promise<void>;
    close(): void;
}
export {};
