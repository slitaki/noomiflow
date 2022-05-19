import {WorkFlow} from './manager/workflow'
/**
 * 流程参数存储类
 */
export class NStorage{
    /**
     * 工作流map
     */
    private static flowMap:Map<string,WorkFlow> = new Map<string,WorkFlow>();
    
    /**
     * 存储map
     * key 流程id，value：参数对象
     */
    private static storeMap:Map<string,object> = new Map<string,object>();

    /**
     * 添加参数
     * @param processId     流程id
     * @param paramName     参数名
     * @param value         参数值
     */
    public static addProcessParam(processId:string,paramName:string,value:any){
        if(!this.storeMap.has(processId)){
            this.storeMap.set(processId,{});
        }
        let map = this.storeMap.get(processId);
        map[paramName] = value;
    }

    /**
     * 获取参数值
     * @param processId     流程id
     * @param paramName     参数名
     * @returns             参数值
     */
    public static getProcessParam(processId,paramName:string):any{
        if(this.storeMap.has(processId)){
            return this.storeMap.get(processId)[paramName];
        }
    }

    /**
     * 获取流程参数obj
     * @param processId     流程id
     */
    public static getProcessParamObj(processId:string):object{
        return this.storeMap.get(processId);
    }

    /**
     * 保存工作流
     * @param flow      工作流对象
     */
    public static saveFlow(flow:WorkFlow){
        this.flowMap.set(flow.id,flow);
    }

    /**
     * 获取工作流
     * @param flowId    流程id 
     * @returns         工作流
     */
    public static getFlow(flowId:string):WorkFlow{
        return this.flowMap.get(flowId);
    }
}