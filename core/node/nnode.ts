import { createGunzip } from "zlib";
import { NFProcess } from "../nfprocess";
import { ENodeType, INode, eventListenType } from "../types";

/**
 * 基础节点
 */
export class NNode {
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

    /**
     * 监听器类名
     */
    listener?: string;

    constructor(cfg: INode, process: NFProcess) {
        this.name = cfg.name;
        this.id = cfg.id;
        this.process = process;
        if (cfg.listener) {
            this.listener = cfg.listener;
        }

    }

    /**
     * 执行函数
     */
    async run() {
        if (this.type !== ENodeType.SEQUENCE) {
            await this.process.setCurrentNode(this);
        }
    };
}