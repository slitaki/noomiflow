export declare const RelaenConfig: {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    cache: boolean;
    debug: boolean;
    fileLog: boolean;
    fullTableOperation: boolean;
    pool: {
        min: number;
        max: number;
    };
    connectTimeout: number;
    idleTimeout: number;
};
