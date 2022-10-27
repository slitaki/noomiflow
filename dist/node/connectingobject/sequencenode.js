"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceNode = void 0;
const expression_1 = require("../../expression");
const types_1 = require("../../types");
const node_1 = require("../node");
/**
 * 顺序流
 */
class SequenceNode extends node_1.FlowNode {
    /**
     * 构造器
     * @param id            节点id
     * @param targetRef     目标节点id
     * @param sourceRef     来源节点id
     * @param expr          表达式串
     */
    constructor(id, name, targetRef, sourceRef, expr) {
        super(id, name);
        this.nodeType = types_1.ENodeType.GATE;
        this.targetRef = targetRef;
        this.sourceRef = sourceRef;
        this.condition = new expression_1.Expression(expr.trim());
    }
}
exports.SequenceNode = SequenceNode;
//# sourceMappingURL=sequencenode.js.map