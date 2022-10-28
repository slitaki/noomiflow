import { NfNode } from "../entity/nfnode";
import { NFProcess } from "../nfprocess";
import { INode } from "../types";
import { NNode } from "./nnode";
/**
 * 人工任务
 */
export declare class NTaskNode extends NNode {
    /**
     * 对应实例实体
     */
    nfNode: NfNode;
    constructor(cfg: INode, process: NFProcess);
    /**
     * 结束任务
     * @param cfg       配置
     */
    finish(cfg?: any): Promise<void>;
}
