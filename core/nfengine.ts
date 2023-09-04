import { EntityManager, Query, RelaenManager, getEntityManager } from "relaen";
import { NfDefProcess } from "./entity/nfdefprocess";
import { NfProcess } from "./entity/nfprocess";
import { NFDeployProcess } from "./nfdeployprocess";
import { NFProcess } from "./nfprocess";
import { NFTaskListener } from "./nftasklistener";
/**
 * 流程引擎
 */
export class NFEngine {
    /**
     * 部署流程模型
     * @param classPath 相对路径
     */
    public static async deployProcess(classpath: string): Promise<NFDeployProcess> {
        const path = require('path').resolve(classpath);
        const cfgStr = require('fs').readFileSync(path);
        const procCfg = JSON.parse(cfgStr);
        //验证流程模型
        const isCorrct = this.varifyProcMdl(procCfg);
        if (isCorrct) {
            //存储流程模型
            let defProc: NfDefProcess = await NFDeployProcess.saveDefineProcess(procCfg);
            let defProcIns = new NFDeployProcess(defProc);
            return defProcIns;
        } else {
            console.log("deploy resource error！");
        }
    }

    /**
     * 检验流程模型
     * todo
     */
    private static varifyProcMdl(procCfg: any) {
        if (!procCfg.name) {
            return false;
        }
        return true;
    }

    /**
     * 创建流程实例
     * @param IdOrName 流程模型 id | name
     * @param instName 创建新流程实例的名称
     * @param userId 
     * @returns 
     */
    static async createProcess(IdOrName: string | number, instName: string, userId?: number): Promise<NFProcess> {
        var defP;
        if (typeof IdOrName === "string") {//流程部署名
            var defProc: NfDefProcess[] = <NfDefProcess[]>await NfDefProcess.findMany({ defName: IdOrName });
            //存在多个时选择最新的版本
            if (defProc.length > 1) {
                var def: NfDefProcess = defProc[0];
                for (let i = 0; i < defProc.length; ++i) {
                    if (defProc[i].createTime > def.createTime) {
                        def = defProc[i];
                    }
                }
                defP = def;
            } else {
                defP = defProc[0];
            }
        } else if (typeof IdOrName === "number") {//主键
            defP = <NfDefProcess>await NfDefProcess.find(IdOrName);
        }
        //流程不存在 流程字节不存在 
        if (!defP || !defP.cfgStr) {
            return;
        }
        //暂停流程定义
        if (defP.isSuspend === 1) {
            throw ("该流程定义已挂起");
        }
        //保存流程实例 
        //userId用于第一个任务节点的Assginee
        if (userId) {
            var creator = userId.toString();
        }
        let proc = await this.saveProcess(defP, instName, creator);
        const process = new NFProcess(defP.cfgStr, proc);
        //返回流程对象
        return process;
    }

    /**
     * 关闭流程
     * @param processId     流程id
     * @param reason        关闭理由
     */
    static async closeProcess(processId: number, reason?: string) {
        const proc = <NfProcess>await NfProcess.find(processId);
        if (!proc) {
            return;
        }
        proc.deleteReason = reason;
        proc.deleteTime = new Date().getTime();
        await proc.save();
        return true;
    }

    /**
     * 根据流程id获取流程
     * @param processId 流程id
     * @returns 
     */
    static async getInstanceById(processId: number): Promise<NFProcess> {
        //从数据库获取 
        const proc = <NfProcess>await NfProcess.find(processId);
        if (!proc) {
            return null;
        }
        //流程已结束
        if (proc.endTime) {
            return null;
        }
        const defProc: NfDefProcess = await proc.getNfDefProcess();
        const process = new NFProcess(defProc.cfgStr, proc);
        //恢复未完成节点
        await process.reCurNodeMap()
        return process;
    }

    /**
     * 根据流程名获取已经开始且未结束的流程
     * @param procName 
     * @param pageNo 
     * @param pageSize 
     */
    static async getInstanceByName(procName: string, pageNo?: number, pageSize?: number) {
        let param = { processName: procName, endTime: null };//todo 优化 不使用null
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfProcess.name);
        let start = 0;
        if (pageNo > 0 && pageSize > 0) {
            start = (pageNo - 1) * pageSize;
        }
        const process: NfProcess[] = <NfProcess[]>await query.select(['*']).where(param).getResultList(start, pageSize);
        const total = await em.getCount(NfProcess.name, param);
        await em.close();
        return { total: total, rows: process }
    }

    /**
     * 保存流程实例：流程流转时,新建和修改时需要保存当前流程的状况
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id //会签任务可能是多个任务
     */
    public static async saveProcess(defProc: NfDefProcess, name: string, userId?: string): Promise<NfProcess> {
        let proc: NfProcess = new NfProcess();
        proc.createTime = new Date().getTime();
        proc.userId = userId;
        proc.processName = name;
        if (defProc.dueTime) {
            proc.dueTime = proc.createTime + defProc.dueTime;
        }
        proc.nfDefProcess = defProc;
        proc = <NfProcess>await proc.save();
        return proc;
    }

    /**
     * 查询已部署的流程
     * @param defId //流程部署id
     * @returns 
     */
    public static async findDefProcByDefId(defId: number): Promise<NFDeployProcess> {
        //流程id
        let defProcess = <NfDefProcess>await NfDefProcess.find(defId);
        let nFDeployProc: NFDeployProcess = new NFDeployProcess(defProcess);
        return nFDeployProc;
    }

    /**
     * 通过关键字查询
     * @param keyWords 
     * @returns 
     */
    public static async findDefProcBykeyWord(keyWords?: string): Promise<NfDefProcess[]> {
        //流程名 
        if (keyWords) {
            let defineProcess = <NfDefProcess[]>await NfDefProcess.findMany({ "keywords": keyWords });
            return defineProcess;
        }//查所有
        else {
            let defineProcess = <NfDefProcess[]>await NfDefProcess.findMany();
            return defineProcess;
        }
    }

    /**
     * 暂停定义的流程
     * @param defId
     * @returns 
     */
    public static async suspendDefProcess(defId: number): Promise<boolean> {
        let defineProcess = <NfDefProcess>await NfDefProcess.find(defId);
        if (!defineProcess.isSuspend || defineProcess.isSuspend === 0) {
            defineProcess.isSuspend = 1;//挂起流程
            await defineProcess.save();
            return true;
        } else { //已经挂起了
            return false;
        }
    }

    /**
     * 唤醒定义的流程
     * @param defId
     * @returns 
     */
    public static async invokeDefProcess(defId: number): Promise<boolean> {
        let defineProcess = <NfDefProcess>await NfDefProcess.find(defId);
        if (defineProcess.isSuspend == 1) {
            defineProcess.isSuspend = 0;//唤醒流程
            await defineProcess.save();
            return true;
        }
        else { //已经唤醒
            return false;
        }
    }


    /**
     * 获取连接 、获取监视器 配合nommi 使用AOP
     * @before注解中使用
     * @param nfConfig
     */
    public static async init() {
        const path = require('path').resolve("./nfconfig.json");
        const str = require('fs').readFileSync(path);
        const json = JSON.parse(str);
        RelaenManager.init(json.RelaenConfig);
        await NFTaskListener.initListenerMap(json.NFlowConfig);
    }
}