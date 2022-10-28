
/**
 * 节点类型
 */
export enum ENodeType{
    SEQUENCE = 'sequence',      //顺序流
    START = 'start',            //开始事件
    END = 'end',                //结束事件
    EXCLUSIVE = 'exclusive',    //排他网关
    PARALLEL = 'parallel',      //并行网关 
    INCLUSIVE = 'inclusive',    //包容网关
    USERTASK = 'usertask',      //用户任务
    MODULETASK = 'moduletask'   //模块任务   
}

export interface INode{
    /**
     * 节点id，全流程唯一
     */
    id:string;
    /**
     * 节点名，全流程唯一(用于显示)
     */
    name:string;

    /**
     * 类型
     */
    type:ENodeType;

    /**
     * 条件，对sequence有效
     */
    cond?:string;

    /**
     * 页面路径，对人工任务有效
     */
    pagePath?:string;

    /**
     * 来源节点，对sequence有效
     */
    src?:string;

    /**
     * 目标节点，对sequence有效
     */
     dst?:string;
}