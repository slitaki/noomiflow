import { Expression } from "../../expression";
import { EAssignType } from "../../types";
import { TaskNode } from "./tasknode";
/**
 * 人机交互任务
 */
export class UserTask extends TaskNode{
    /**
     * 候选人（表达式或用户名或组名）
     */
    candidate?:Expression|string;

     /**
      * 指派类型
      */
    assignType:EAssignType;
}