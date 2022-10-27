"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelaenConfig = void 0;
exports.RelaenConfig = {
    "dialect": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "field",
    "database": "nooflow",
    "entities": [
        "/dist/core/entity/**/*.js"
    ],
    "cache": true,
    "debug": true,
    "fileLog": false,
    "fullTableOperation": true,
    "pool": {
        "min": 1,
        "max": 10
    },
    "connectTimeout": 10000,
    "idleTimeout": 10000
};
//# sourceMappingURL=relaenconfig.js.map