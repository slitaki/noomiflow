import { Expression } from "../expression";
import { EAssignType, ETaskType } from "../types";
import { FlowNode } from "./basenode";

/**
 * 任务
 */
export class TaskNode extends FlowNode{
    /**
     * 任务类型
     */
    type:ETaskType;

    /**
     * 资源id
     */
    resourceId:string;

    /**
     * 候选人（表达式或用户名或组名）
     */
    candidate:Expression|string;

    /**
     * 指派类型
     */
    assignType:EAssignType;
}