import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";

/**
 * 排他网关
 */
export class NExclusiveNode extends NNode {
    /**
     * 出口顺序流
     */
    outSequences: NSequenceNode[];

    constructor(cfg: INode, process: NFProcess) {
        super(cfg, process);
    }

    async run() {
        // await super.run();
        //第一个满足则结束
        for (let node of this.outSequences) {
            if (await node.run()) {
                break;
            }
        }
    }

    init() {
        this.outSequences = this.process.getSequenceNodes(this.id);
        if (!this.outSequences || this.outSequences.length === 0) {
            throw `节点'${this.name}'配置错误!`;
        }
    }
}