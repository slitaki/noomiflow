import { ENodeType } from "../types";

/**
 * 工作流节点
 */
 export class FlowNode{
    /**
     * 节点类型
     */
    node:ENodeType;
    /**
     * 节点id（流程内唯一）
     */
    id:string;

    /**
     * 节点执行
     * @param model     传递的数据模型，可为空 
     */
    public run(model?:any){
        
    }
}