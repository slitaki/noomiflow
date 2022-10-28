import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";
/**
 * 并行网关
 */
export declare class NInclusiveNode extends NNode {
    outSequences: NSequenceNode[];
    inSequences: NSequenceNode[];
    /**
     * 出口顺序流
     */
    sequences: NSequenceNode[];
    /**
     * 执行剩余数量
     */
    inCount: number;
    constructor(cfg: INode, process: NFProcess);
    run(): Promise<void>;
    init(): void;
}
