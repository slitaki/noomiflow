import { NExpression } from "../expression";
import { NFProcess } from "../nfprocess";
import { NNode } from "./nnode";
export declare class NSequenceNode extends NNode {
    /**
     * 表达式处理器
     */
    expr: NExpression;
    /**
     * 源节点
     */
    src: string;
    /**
     * 目标节点
     */
    dst: string;
    constructor(cfg: any, process: NFProcess);
    run(): Promise<any>;
}
