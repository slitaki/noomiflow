import { NfDefProcess } from "./entity/nfdefprocess";
import { NfProcess } from "./entity/nfprocess";
import { NfNode } from "./entity/nfnode";
import { NFProcess } from "./nfprocess";
/**
 * 流程引擎
 */
export class NFEngine{
    /**
     * 流程map
     */
    static processMap:Map<number,NFProcess> = new Map();

    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串 
     */
    static async defineProcess(cfg){
        const defP:NfDefProcess = new NfDefProcess();
        defP.defName = cfg.name;
        defP.createTime = new Date().getTime();
        defP.dueTime = cfg.dueTime;
        defP.cfgStr = JSON.stringify(cfg.nodes);
        await defP.save();
    }

    /**
     * 创建流程实例
     * @param defName   流程定义名
     * @param instName  流程实例名  
     * @returns     流程实例
     */
    static async createProcess(defName:string,instName:string,userId?:number):Promise<NFProcess>{
        const defP = <NfDefProcess>await NfDefProcess.findOne({defName:defName});
        if(!defP || !defP.cfgStr){
            return;
        }
        let cfg;
        try{
            cfg = JSON.parse(defP.cfgStr);
        }catch(e){
            throw "流程定义错误!";
        }
        const process = new NFProcess(cfg);
        //保存流程实例
        process.instance = await this.saveInstance(defP,instName,userId);
        //设置流程当前id
        process.userId = userId;
        //返回流程对象
        return process;
    }

    /**
     * 获取流程实例
     */
    static async getInstance(procId:number,userId:number):Promise<NFProcess>{
        //从缓存获取
        if(this.processMap.has(procId)){
            return this.processMap.get(procId);
        }
        //从数据库获取
        const proc = <NfProcess>await NfProcess.find(procId);
        if(!proc){
            return null;
        }
        
        const defProc:NfDefProcess = await proc.getNfDefProcess();

        let cfg;
        try{
            cfg = JSON.parse(defProc.cfgStr);
        }catch(e){
            throw "流程定义错误!";
        }
        const process = new NFProcess(cfg);
        //保存流程实例
        process.instance = proc;
        this.processMap.set(procId,process);
        return process;
    }


    /**
     * 保存流程实例
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    public static async saveInstance(defProc:NfDefProcess,name:string,userId:number){
        let proc:NfProcess = new NfProcess();
        proc.createTime = new Date().getTime();
        proc.processName = name;
        if(defProc.dueTime){
            proc.dueTime = proc.createTime + defProc.dueTime;
        }
        proc.nfDefProcess = defProc;
        proc = <NfProcess>await proc.save();
        return proc;
    }

    /**
     * 获取用户处理流程
     * @param userId    用户id
     * @param status    状态 0:未处理  1已处理  2全部
     */
    public static async getUserProcess(userId:number,status?:number):Promise<NfNode[]>{
        const param = {
            candidateUsers:{rel:'like',value:','+userId+','}
        }
        if(status === 0){
            param['endTime'] = null;
        }else if(status === 1){
            param['endTime'] = {rel:'is',value:'not null'};
        }
        let nodes = <NfNode[]>await NfNode.findMany({candidateUsers:{rel:'like',value:userId+','}});
        for(let n of nodes){
            await n.getNfProcess();
            await n.getNfResources();
        }
        return nodes;
    }
}