import { NNode } from "./node/nnode";
import { NSequenceNode } from "./node/nsequencenode";
import { INode } from "./types";
import { NfProcess } from "./entity/nfprocess";
import { NfNode } from "./entity/nfnode";
/**
 * 流程类
 */
export declare class NFProcess {
    /**
     * 流程节点集合
     */
    nodes: NNode[];
    /**
     * 当前任务节点
     */
    private currentNode;
    /**
     * 流程参数
     */
    private params;
    /**
     * 流程实体
     */
    instance: NfProcess;
    /**
     * 当前用户id
     */
    userId: number;
    constructor(cfg: any, inst?: NfProcess);
    /**
     * 处理节点
     * @param nodes
     * @returns
     */
    handleNodes(nodes: INode[]): void;
    /**
     * 对有init方法的节点执行init
     */
    doNodeInit(): void;
    /**
     * 获取参数
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getParam(key?: string): any;
    /**
     * 保存参数
     * @param key       key
     * @param value     值
     */
    setParam(key: string, value: any): void;
    /**
     * 开始流传
     */
    start(): Promise<void>;
    /**
     * 结束
     */
    end(): Promise<void>;
    /**
     * 获取节点
     * @param id    节点id
     * @returns     节点
     */
    getNode(id: string): NNode;
    /**
     * 设置当前节点
     * @param node
     */
    setCurrentNode(node: NNode): Promise<void>;
    /**
     * 执行下一个节点
     * @param cfg       配置
     * @returns
     */
    next(cfg?: object): Promise<void>;
    /**
     * 获取顺序流节点
     * @param id        src 或 dst节点id
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(id: string, isDst?: boolean): NSequenceNode;
    /**
     * 获取顺序流节点集合，主要用于网关
     * @param id        src 或 dst节点id
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNodes(id: string, isDst?: boolean): NSequenceNode[];
    /**
     * 获取所有任务节点及资源
     * @param procId    流程id
     * @returns         节点集合
     */
    getAllNodes(procId: number): Promise<NfNode[]>;
}
