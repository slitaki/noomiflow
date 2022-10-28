"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NInclusiveNode = void 0;
const nnode_1 = require("./nnode");
/**
 * 并行网关
 */
class NInclusiveNode extends nnode_1.NNode {
    constructor(cfg, process) {
        super(cfg, process);
    }
    async run() {
        await super.run();
        //执行一次，则计数器-1，到0时，表示网关可以进行下一步
        if (--this.inCount === 0) {
            for (let node of this.outSequences) {
                await node.run();
            }
        }
    }
    init() {
        this.outSequences = this.process.getSequenceNodes(this.id);
        this.inSequences = this.process.getSequenceNodes(this.id, true);
        if (!this.outSequences || this.outSequences.length === 0 || !this.inSequences || this.inSequences.length === 0) {
            throw `节点'${this.name}'配置错误!`;
        }
        this.inCount = this.inSequences.length;
    }
}
exports.NInclusiveNode = NInclusiveNode;
//# sourceMappingURL=ninclusivenode.js.map