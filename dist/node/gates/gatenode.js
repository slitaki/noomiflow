"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GateNode = void 0;
const node_1 = require("../node");
const types_1 = require("../../types");
/**
 * 网关
 */
class GateNode extends node_1.FlowNode {
    /**
     * 构造器
     * @param id            节点id
     * @param type          网关类型
     * @param defaultId     默认顺序流id
     */
    constructor(id, type, defaultId) {
        super(id);
        this.type = type;
        this.default = defaultId;
        this.nodeType = types_1.ENodeType.GATE;
    }
    /**
     * 执行
     * @param model
     */
    run(model) {
    }
    /**
     * 添加来源顺序流
     * @param seqId     顺序流id
     */
    addSourceSeq(seqId) {
        if (!this.sourceSeqs) {
            this.sourceSeqs = [];
        }
        this.sourceSeqs.push(seqId);
    }
    /**
     * 添加来源顺序流
     * @param seqId     顺序流id
     */
    addTargetSeq(seqId) {
        if (!this.targetSeqs) {
            this.targetSeqs = [];
        }
        this.targetSeqs.push(seqId);
    }
}
exports.GateNode = GateNode;
//# sourceMappingURL=gatenode.js.map