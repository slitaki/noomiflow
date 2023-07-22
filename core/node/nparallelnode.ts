import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";

/**
 * 并行网关
 */
export class NParallelNode extends NNode {
    /**
     * 出口顺序流
     */
    outSequences: NSequenceNode[];

    /**
     * 入口顺序流
     */
    inSequences: NSequenceNode[];

    /**
     * 执行剩余数量
     */
    inCount: number;

    constructor(cfg: INode, process: NFProcess) {
        super(cfg, process);
    }

    async run() {
        let param = await this.process.getIncomParams(this.id);
        if (!param) { //不存在则初始化
            await this.process.setIncomParams(this.id, this.inCount);
        } else {
            param--;//执行一次，则计数器-1，到0时，表示网关可以进行下一步 
            if (param === 0) {
                for (let node of this.outSequences) {
                    await node.run();
                }
                await this.process.deleteIncomParams(this.id);
            } else {
                this.process.instance.incomParams[this.id] = param;
                await this.process.instance.save();
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