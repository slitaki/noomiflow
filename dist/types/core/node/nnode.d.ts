import { NFProcess } from "../nfprocess";
import { INode } from "../types";
/**
 * 基础节点
 */
export declare class NNode {
    /**
     * 所属流程
     */
    process: NFProcess;
    /**
     * 节点id，流程内唯一
     */
    id: string;
    /**
     * 节点名，用于显示
     */
    name: string;
    /**
     * 类型
     */
    type: string;
    constructor(cfg: INode, process: NFProcess);
    /**
     * 执行函数
     */
    run(): Promise<void>;
}
