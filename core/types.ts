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

/**
 * 事件类型
 */
export enum EEventType{
    /**
     * 开始事件
     */
    START='start',
    /**
     * 结束事件
     */
    END='end',
    /**
     * 终止事件
     */
    TERMINATE='terminate'
}

/**
 * 任务类型
 */
export enum ETaskType{
    /**
     * 用户任务
     */
    USER = 'user',
    /**
     * 手工任务
     */
    MANUAL = 'manual'
}

/**
 * 任务指派类型
 */
export enum EAssignType{
    /**
     * 指派到组
     */
    GROUP = 'group',

    /**
     * 指派到人
     */
    USER = 'user'
}
