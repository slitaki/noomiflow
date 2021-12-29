import { FlowCondition } from "./flowcondition";

/**
 * 工作流节点枚举类型
 */
export enum ENodeType{
    /**
     * 事件
     */
    EVENT = 'event',
    /**
     * 子流程
     */
    PROCESS = 'process',

    /**
     * 顺序流
     */
    SEQUENCE = 'sequence',

    /**
     * 网关
     */
    GATE = 'gate'
}

/**
 * 网关节点类型
 */
export enum EGateType{
    /**
     * 唯一网关
     */
    EXCLUSIVE='exclusive',

    /**
     * 并行网关
     */
    PARALLEL='parallel',

    /**
     * 包含网关
     */
    INCLUSIVE='inclusive'
}
