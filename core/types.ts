import { NfNode } from "./entity/nfnode";

/**
 * 节点类型
 */
export enum ENodeType {
    SEQUENCE = 'sequence',      //顺序流
    START = 'start',            //开始事件
    END = 'end',                //结束事件
    EXCLUSIVE = 'exclusive',    //排他网关
    PARALLEL = 'parallel',      //并行网关 
    INCLUSIVE = 'inclusive',    //包容网关
    USERTASK = 'usertask',      //用户任务
    MODULETASK = 'moduletask', //模块任务
    SCRIPTTASK = 'scriptTask', //函数任务
    TASK = 'task'               //普通任务
}

export const GatewayType = ["exclusiveGateway", "inclusiveGateway", "parallelGateway"]
export const TaskType = ["userTask", "task", "scriptTask"]
/**网关映射信息 */
export enum NfType {
    exclusiveGateway = ENodeType.EXCLUSIVE,
    inclusiveGateway = ENodeType.INCLUSIVE,
    parallelGateway = ENodeType.PARALLEL,
    userTask = ENodeType.USERTASK,
    scriptTask = ENodeType.SCRIPTTASK,
    task = ENodeType.TASK
}
export interface INode {
    /**
     * 节点id，全流程唯一
     */
    id: string;
    /**
     * 节点名，全流程唯一(用于显示)
     */
    name: string;

    /**
     * 类型
     */
    type: ENodeType;

    /**
     * 条件，对sequence有效
     */
    cond?: string;

    /**
     * 页面路径，对人工任务有效
     */
    pagePath?: string;

    /**
     * 来源节点，对sequence有效
     */
    src?: string;

    /**
     * 目标节点，对sequence有效
     */
    dst?: string;

}
export class NFlowNode {
    /**
     * 节点id，全流程唯一
     */
    id: string;
    /**
     * 节点名，全流程唯一(用于显示)
     */
    name: string;

    /**
     * 类型
     */
    type: ENodeType;

    /**
     * 条件，对sequence有效
     */
    cond?: string;

    /**
     * 页面路径，对人工任务有效
     */
    pagePath?: string;

    /**
     * 函数块  用于script task任务
     */
    script?: string;

    /**
     *  函数路径 用于script task 任务
     */
    path?: string

    /**
     * 任务候选人
     */
    candidateUsers?: string
    /**
     * 来源节点，对sequence有效
     */
    src?: string;

    /**
     * 目标节点，对sequence有效
     */
    dst?: string;

}
export interface userTask {
    total: number,
    rows: NfNode[]
}

//双向链表
export class deLinkList {
    public last: deLinkList; //前一个节点
    public front: deLinkList; //后一个节点
    public id: string; //节点id 唯一
    public type: string; //节点类型 
    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}
