"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSequenceNode = void 0;
const expression_1 = require("../expression");
const nnode_1 = require("./nnode");
const nparallelnode_1 = require("./nparallelnode");
class NSequenceNode extends nnode_1.NNode {
    constructor(cfg, process) {
        super(cfg, process);
        this.src = cfg.src;
        this.dst = cfg.dst;
        if (cfg.cond) {
            this.expr = new expression_1.NExpression(cfg.cond);
        }
    }
    async run() {
        const node = this.process.getNode(this.dst);
        if (!node) {
            throw '目标节点不存在';
        }
        //并行网关，不执行条件
        if (node instanceof nparallelnode_1.NParallelNode) {
            await node.run();
        }
        else if (!this.expr || this.expr.val(this.process.getParam())) {
            await node.run();
        }
        else {
            return false;
        }
        return true;
    }
}
exports.NSequenceNode = NSequenceNode;
//# sourceMappingURL=nsequencenode.js.map