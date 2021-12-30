import { WorkFlow } from "../workflow";

/**
 * 流程管理器
 */
export class FlowManager{
    /**
     * 当前流程id，使用时+1
     */
    private static currentFlowId:number = 0;
    
    /**
     * 流程map，用于管理所有工作流
     * 键为流程id，值为流程对象
     */
    private flowMap:Map<number,WorkFlow> = new Map();


    createFlow(){

    }
}