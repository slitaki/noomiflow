"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExclusiveNode = void 0;
const nnode_1 = require("./nnode");
class NExclusiveNode extends nnode_1.NNode {
    constructor(cfg, process) {
        super(cfg, process);
    }
    async run() {
        await super.run();
        //第一个满足则结束
        for (let node of this.outSequences) {
            if (await node.run()) {
                break;
            }
        }
    }
    init() {
        this.outSequences = this.process.getSequenceNodes(this.name);
        if (!this.outSequences || this.outSequences.length === 0) {
            throw `节点'${this.name}'配置错误!`;
        }
    }
}
exports.NExclusiveNode = NExclusiveNode;
//# sourceMappingURL=nexclusivenode.js.map