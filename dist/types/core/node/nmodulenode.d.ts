import { NNode } from "./nnode";
/**
 * 可执行模块节点
 * 定义方法
 * @param process   当前流程
 * module.exports = function(process){
 *    //your code
 *      ....
 *    //可把结果写到process参数中
 *
 * }
 */
export declare class NModuleNode extends NNode {
    /**
     * 模块路径
     */
    modulePath: string;
    constructor(cfg: any, process: any);
    run(): Promise<void>;
}
