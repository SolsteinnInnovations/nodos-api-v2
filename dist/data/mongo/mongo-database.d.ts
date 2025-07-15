interface Options {
    mongoUrl: string;
    dbName: string;
}
export declare class MongoDatabase {
    static connect(options: Options): Promise<boolean>;
    static disconnect(): Promise<void>;
}
export {};
