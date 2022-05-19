import { WorkFlow } from "./workflow";

/**
 * 流程管理器
 */
export class FlowManager{
    /**
     * 当前流程id
     */
    private static currentFlowId:string;
    
    /**
     * 流程map，用于管理所有工作流
     * 键为流程id，值为流程对象
     */
    private static flowMap:Map<string,WorkFlow> = new Map();

    /**
     * 获取或创建流实例
     * @param config    flow id（string）或flow配置（object）
     * @returns         workflow 实例 
     */
    public static getInstance(config?:any):WorkFlow{
        if(typeof config === 'string'){
            return this.flowMap.get(config);
        }else{ //新建，并加入flow map
            let ins = new WorkFlow(config);
            this.flowMap.set(ins.id,ins);
        }
    }
}