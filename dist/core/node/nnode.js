"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NNode = void 0;
const types_1 = require("../types");
/**
 * 基础节点
 */
class NNode {
    constructor(cfg, process) {
        this.name = cfg.name;
        this.id = cfg.id;
        this.process = process;
    }
    /**
     * 执行函数
     */
    async run() {
        if (this.type !== types_1.ENodeType.SEQUENCE) {
            await this.process.setCurrentNode(this);
        }
    }
    ;
}
exports.NNode = NNode;
//# sourceMappingURL=nnode.js.map