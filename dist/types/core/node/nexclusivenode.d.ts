import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";
export declare class NExclusiveNode extends NNode {
    /**
     * 出口顺序流
     */
    outSequences: NSequenceNode[];
    constructor(cfg: INode, process: NFProcess);
    run(): Promise<void>;
    init(): void;
}
