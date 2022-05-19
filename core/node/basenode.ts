import { ENodeType } from "../types";

/**
 * 工作流基础节点
 */
export class FlowNode{
    /**
     * 节点id（流程内唯一）
     */
    id:string;

    /**
     * 节点名（可选）
     */
    name?:string;

    /**
     * 所属流程id
     */
    flowId:number; 
    
    /**
     * 节点类型
     */
    nodeType:ENodeType;

    /**
     * 构造器
     * @param id    节点id
     * @param name  节点名
     */
    constructor(id:string,name?:string){
        this.id = id;
        this.name = name;
    }
    /**
     * 节点执行
     * @param model     传递的数据模型，可为空 
     */
    public run(model?:any):void{
        
    }
}