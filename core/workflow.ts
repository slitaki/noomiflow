import { FlowNode } from "./node/basenode";

/**
 * 工作流
 */
export class WorkFlow{
    /**
     * 当前节点id
     */
    public currentNodeId:string;

    /**
     * 流程名
     * 如果该流程需要作为子流程被其它流程使用，需要设置name，在引用流程中直接使用ref方式使用
     */
    public name:string;

    /**
     * 节点map
     * 用于管理流程内的所有节点，以节点id进行管理
     */
    public nodeMap:Map<string,FlowNode>;

    /**
     * 构造器
     * @param config    流程配置对象（由流程配置文件生成）
     */
    constructor(config:object){
        
    }
}