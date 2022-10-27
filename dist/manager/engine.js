"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEngine = void 0;
const storage_1 = require("../storage");
const workflow_1 = require("./workflow");
/**
 * 流程引擎类
 */
class NEngine {
    static create(cfgFile) {
        let str = require('fs').readFileSync(cfgFile);
        try {
            const json = JSON.parse(str);
            storage_1.NStorage.saveFlow(new workflow_1.WorkFlow(json));
        }
        catch (e) {
            throw 'flow config is wrong';
        }
    }
    /**
     * 启动流程
     * @param flow
     */
    static start(flow) {
        flow.run(true);
    }
}
exports.NEngine = NEngine;
//# sourceMappingURL=engine.js.map