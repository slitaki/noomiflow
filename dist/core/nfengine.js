"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFEngine = void 0;
const nfdefprocess_1 = require("./entity/nfdefprocess");
const nfprocess_1 = require("./entity/nfprocess");
const nfnode_1 = require("./entity/nfnode");
const nfprocess_2 = require("./nfprocess");
/**
 * 流程引擎
 */
class NFEngine {
    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串
     */
    static async defineProcess(cfg) {
        const defP = new nfdefprocess_1.NfDefProcess();
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
    static async createProcess(defName, instName, userId) {
        const defP = await nfdefprocess_1.NfDefProcess.findOne({ defName: defName });
        if (!defP || !defP.cfgStr) {
            return;
        }
        let cfg;
        try {
            cfg = JSON.parse(defP.cfgStr);
        }
        catch (e) {
            throw "流程定义错误!";
        }
        const process = new nfprocess_2.NFProcess(cfg);
        //保存流程实例
        process.instance = await this.saveInstance(defP, instName, userId);
        //设置流程当前id
        process.userId = userId;
        //返回流程对象
        return process;
    }
    /**
     * 获取流程实例
     */
    static async getInstance(procId, userId) {
        //从缓存获取
        if (this.processMap.has(procId)) {
            return this.processMap.get(procId);
        }
        //从数据库获取
        const proc = await nfprocess_1.NfProcess.find(procId);
        if (!proc) {
            return null;
        }
        const defProc = await proc.getNfDefProcess();
        let cfg;
        try {
            cfg = JSON.parse(defProc.cfgStr);
        }
        catch (e) {
            throw "流程定义错误!";
        }
        const process = new nfprocess_2.NFProcess(cfg);
        //保存流程实例
        process.instance = proc;
        this.processMap.set(procId, process);
        return process;
    }
    /**
     * 保存流程实例
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    static async saveInstance(defProc, name, userId) {
        let proc = new nfprocess_1.NfProcess();
        proc.createTime = new Date().getTime();
        proc.processName = name;
        if (defProc.dueTime) {
            proc.dueTime = proc.createTime + defProc.dueTime;
        }
        proc.nfDefProcess = defProc;
        proc = await proc.save();
        return proc;
    }
    /**
     * 获取用户处理流程
     * @param userId    用户id
     * @param status    状态 0:未处理  1已处理  2全部
     */
    static async getUserProcess(userId, status) {
        const param = {
            candidateUsers: { rel: 'like', value: ',' + userId + ',' }
        };
        if (status === 0) {
            param['endTime'] = null;
        }
        else if (status === 1) {
            param['endTime'] = { rel: 'is', value: 'not null' };
        }
        let nodes = await nfnode_1.NfNode.findMany({ candidateUsers: { rel: 'like', value: userId + ',' } });
        for (let n of nodes) {
            await n.getNfProcess();
            await n.getNfResources();
        }
        return nodes;
    }
}
exports.NFEngine = NFEngine;
/**
 * 流程map
 */
NFEngine.processMap = new Map();
//# sourceMappingURL=nfengine.js.map