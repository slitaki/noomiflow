import { NfDefProcess } from "./entity/nfdefprocess";
import { NfProcess } from "./entity/nfprocess";
import { NfNode } from "./entity/nfnode";
import { NFProcess } from "./nfprocess";
/**
 * 流程引擎
 */
export declare class NFEngine {
    /**
     * 流程map
     */
    static processMap: Map<number, NFProcess>;
    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串
     */
    static defineProcess(cfg: any): Promise<void>;
    /**
     * 创建流程实例
     * @param defName   流程定义名
     * @param instName  流程实例名
     * @returns     流程实例
     */
    static createProcess(defName: string, instName: string, userId?: number): Promise<NFProcess>;
    /**
     * 获取流程实例
     */
    static getInstance(procId: number, userId: number): Promise<NFProcess>;
    /**
     * 保存流程实例
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    static saveInstance(defProc: NfDefProcess, name: string, userId: number): Promise<NfProcess>;
    /**
     * 获取用户处理流程
     * @param userId    用户id
     * @param status    状态 0:未处理  1已处理  2全部
     */
    static getUserProcess(userId: number, status?: number): Promise<NfNode[]>;
}
