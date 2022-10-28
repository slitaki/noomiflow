/**
 * 节点类型
 */
export declare enum ENodeType {
    SEQUENCE = "sequence",
    START = "start",
    END = "end",
    EXCLUSIVE = "exclusive",
    PARALLEL = "parallel",
    INCLUSIVE = "inclusive",
    USERTASK = "usertask",
    MODULETASK = "moduletask"
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
