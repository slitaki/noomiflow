import { NEndNode } from "./node/nendnode";
import { NNode } from "./node/nnode";
import { NSequenceNode } from "./node/nsequencenode";
import { NStartNode } from "./node/nstartnode";
import { ENodeType, INode, deLinkList, eventListenType } from "./types";
import { NExclusiveNode } from "./node/nexclusivenode";
import { NInclusiveNode } from "./node/ninclusivenode";
import { NParallelNode } from "./node/nparallelnode";
import { NfProcess } from "./entity/nfprocess";
import { NUserTaskNode } from "./node/nusertasknode";
import { NTaskNode } from "./node/ntasknode";
import { NfNode } from "./entity/nfnode";
import { NModuleNode } from "./node/nmodulenode";
import { NFTask } from "./nftask";
import { NFTaskListener } from "./nftasklistener";
import { EntityManager, getEntityManager } from "relaen";
import { NfHiProcInst } from "./entity/nfhiprocinst";

/**
 * 流程类
 */
export class NFProcess {
    /**
     * 流程节点集合
     */
    private nodes: NNode[] = [];
    /**
     * 当前任务节点 并行网关等 流程会有多个任务节点
     */
    private currentNodeMap: Map<string, NFTask> = new Map();
    /**
     * 流程参数
     */
    private params: any = {};
    /**
     * 流程实体
     */
    public instance: NfProcess;
    /**
     * 节点链接图
     */
    public linkGraph: any = {};
    /**
     * 流程定义字符串
     */
    private cfgStr: string;

    public taskListenerSet = new Set();

    constructor(cfg, inst?: NfProcess) {
        this.cfgStr = cfg;
        if (inst) {
            this.instance = inst;
            if (inst.variables) {
                this.params = JSON.parse(inst.variables)
            }

        }

    }

    /**
     * 处理节点
     * @param nodes 
     * @returns 
     */
    handleNodes(cfgNode: string) {
        let nodes = this.parseCfgStr(cfgNode)
        const rNodes = [];
        for (let n of nodes) {
            let node;
            switch (n.type) {
                case ENodeType.START:
                    node = new NStartNode(n, this);
                    break;
                case ENodeType.END:
                    node = new NEndNode(n, this);
                    break;
                case ENodeType.SEQUENCE:
                    node = new NSequenceNode(n, this);
                    break;
                case ENodeType.USERTASK:
                    node = new NUserTaskNode(n, this);
                    break;
                case ENodeType.MODULETASK:
                    node = new NModuleNode(n, this);
                    break;
                case ENodeType.EXCLUSIVE:
                    node = new NExclusiveNode(n, this);
                    break;
                case ENodeType.INCLUSIVE:
                    node = new NInclusiveNode(n, this);
                    break;
                case ENodeType.PARALLEL:
                    node = new NParallelNode(n, this);
                    break;
            }
            rNodes.push(node);
        }
        this.nodes = rNodes;
        //执行节点初始化
        this.doNodeInit();
    }

    /**
     * 对有init方法的节点执行init  todo在恢复实例时 是否执行init 方法
     */
    private doNodeInit() {
        for (let node of this.nodes) {
            if (node['init']) {
                node['init'].apply(node);
            }
        }
    }

    /**
     * 获取start流程变量
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getStartParam(key?: string) {
        if (!this.params) {
            return; //判断 todo
        }
        if (key) {
            return this.params[key];
        }
        return this.params;
    }

    /**
     * 设置开始流程变量
     * @param key       key
     * @param value     值
     */
    setStartParam(key: string, value: any) {
        let param = {};
        param[key] = value;
        Object.assign(this.params, param);
    }

    /**
     * 开始流传
     */
    async start() {
        this.handleNodes(this.cfgStr);
        const node = this.nodes.find(item => item instanceof NStartNode);
        if (!node) {
            throw "流程无开始节点";
        }
        if (this.instance.startTime) {
            throw "流程已开始";
        }
        if (this.instance.endTime) {
            throw "流程已结束";
        }
        if (this.instance.deleteTime) {
            throw "流程已关闭";
        }
        await node.run();
        //修改开始时间
        this.instance.startTime = new Date().getTime();
        //参数保存到流程实例中
        this.instance.variables = JSON.stringify(this.params);
        await this.instance.save();
    }

    /**
     * 结束 该process 下所有节点任务同样关闭
     */
    public async end() {
        //流程所有未完成节点终止
        if (this.currentNodeMap.size > 0) {
            for (let k of this.currentNodeMap.keys()) {
                await this.currentNodeMap.get(k).stopTask();
            }
        }
        this.currentNodeMap.clear();
        this.instance.endTime = new Date().getTime();
        this.instance.handleTime = this.instance.endTime - this.instance.startTime;
        await this.instance.save();
        await this.saveHisProc();
    }

    /**
     * 保存历史流程
     */
    public async saveHisProc() {
        let hisProc: NfHiProcInst = new NfHiProcInst();
        hisProc.processId = this.getId();
        hisProc.procDefId = this.getDefId();
        hisProc.startTime = this.getStartTime();
        hisProc.endTime = this.instance.endTime;
        hisProc.duration = this.instance.handleTime;
        await hisProc.save();
    }
    /**
     * 获取定义节点
     * @param id    节点id 
     * @returns     节点
     */
    public getNode(id: string): NNode {
        return this.nodes.find(item => item.id === id);
    }

    /**
     * 设置当前节点
     * @param node 
     */
    public async setCurrentNode(node: NNode) {
        if (node instanceof NTaskNode) {
            let currentTask = new NFTask(node, this);
            //任务节点加入当前任务节点map
            this.currentNodeMap.set(currentTask.getDefId(), currentTask);
            //修改实体当前任务节点
            this.instance.currentId = this.getMapkeys();
            await this.instance.save();
            if (node.nfNode && node.nfNode.variables) {
                let param = JSON.stringify(node.nfNode.variables);
                Object.assign(this.params, param);
            }
        }
    }

    /**
     * 用于恢复流程实例所有当前的任务节点
     */
    public async reCurNodeMap() {
        let procId = this.getId();
        let nodeArr: NfNode[] = await this.getAllNodes(procId);
        //将所有节点放入currentNodeMap中
        for (let node of nodeArr) {
            let NNode = this.handleTaskNode(node);
            if (NNode instanceof NTaskNode) {
                //此时节点实例需要加入节点实体
                NNode.nfNode = node;
                let currentTask = new NFTask(NNode, this);
                this.currentNodeMap.set(currentTask.getDefId(), currentTask);
            }
        }
    }

    /**
     * 将数据库存储节点转化为Node节点
     * @param node nfNode节点实体
     * @returns 
     */
    private handleTaskNode(node: NfNode) {
        let cfg: INode = <INode>{ name: node.nodeName, id: node.defId };
        switch (node.nodeType) {
            case ENodeType.USERTASK:
                return new NUserTaskNode(cfg, this);
            case ENodeType.MODULETASK:
                return new NModuleNode(cfg, this);
        }
    }

    /**
     * 执行下一节点
     * @param defId  节点id
     * @param cfg 
     */
    public async next(defId: string, cfg?: object): Promise<void> {
        // this.procNodeDefId = defId;
        //任务节点
        let node: NFTask = this.currentNodeMap.get(defId);
        if (node) {
            await node.finish(cfg);
            //从map中删除该节点
            this.currentNodeMap.delete(defId);
        } else {
            throw ("当前流程实例无该任务!");
        }
        if (this.nodes.length == 0) {
            this.handleNodes(this.cfgStr);
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(defId);
        if (seq) {
            await seq.run();
        }
        this.instance.currentId = this.getMapkeys();
        await this.instance.save();
    }

    /**
     * 获取顺序流节点
     * @param id        src 或 dst节点id
     * @param isDst     如果name为dst，则该项为true
     */
    public getSequenceNode(id: string, isDst?: boolean): NSequenceNode {
        if (isDst) {
            return <NSequenceNode>this.nodes.find(item => item['dst'] === id);
        }
        return <NSequenceNode>this.nodes.find(item => item['src'] === id);
    }

    /**
     * 获取顺序流节点集合，主要用于网关
     * @param id        src 或 dst节点id
     * @param isDst     如果name为dst，则该项为true
     */
    public getSequenceNodes(id: string, isDst?: boolean): NSequenceNode[] {
        if (isDst) {
            return <NSequenceNode[]>this.nodes.filter(item => item['dst'] === id);
        }
        return <NSequenceNode[]>this.nodes.filter(item => item['src'] === id);
    }

    /**
     * 获取所有任务节点及资源
     * @param procId    流程id
     * @returns         节点集合
     */
    private async getAllNodes(procId: number): Promise<NfNode[]> {
        //从数据库获取
        const nodes: NfNode[] = <NfNode[]>await NfNode.findMany({
            nfProcess: procId,
            endTime: null
        });
        //获取资源
        for (let n of nodes) {
            await n.getNfResources();
            await n.getNfProcess();
        }
        return nodes;
    }

    /**
     * 获取当前流程实例实体的流程id
     * @returns 
     */
    public getId(): number {
        return this.instance.processId;
    }
    public getStartTime() {
        return this.instance.startTime;
    }
    public getDefId(): number {
        return this.instance.nfDefProcess.processDefId;
    }
    /**
     * 动态路由节点跳转
     * @param curNodeId  //原节点id
     * @param aimNode  //跳转的任务节点名
     */
    public async jumpTo(curNodeId: number, aimDefId: string): Promise<boolean> {
        let task: NfNode = <NfNode>await NfNode.find(curNodeId);
        let defId: string = task.defId;
        if (!this.currentNodeMap.has(defId)) { //当前节点不存在
            return false;
        }
        let curNode: NFTask = this.currentNodeMap.get(defId);
        //链表未构建
        if (Object.keys(this.linkGraph).length == 0) {
            this.buildLinkGraph();
        }
        let targetNode: NNode = this.nodes.find(item => {
            item.id === aimDefId
        })
        if (!targetNode) return false; //目标节点不存在
        let count = this.currentNodeMap.size; //当前节点个数
        if (count == 0) {
            return false;
        }
        if (count > 1) { //当前存在多个任务节点
            //未跳转到路由之前,则只处理当前节点即可
            if (!this.isBeforGateway(curNode.getDefId(), aimDefId)) {
                await curNode.stopTask();
                this.currentNodeMap.delete(defId);
            } else { //当前任务所有节点都需要回退
                let cnMapKeys = this.currentNodeMap.keys();
                for (let k of cnMapKeys) {
                    let task = this.currentNodeMap.get(k);
                    await task.stopTask()
                }
            }
        } else { //只存在一个节点
            await curNode.stopTask();
            this.currentNodeMap.delete(defId);
        }
        if (targetNode instanceof NTaskNode) {
            this.setCurrentNode(targetNode);
        }
        return true;
    }

    /**
     * 判断跳转节点是否在包容网关或并行网关之前
     * @param curid 
     * @param aimId 
     * @returns 
     */
    private isBeforGateway(curid: string, aimId: string): boolean {
        let frontNode = this.linkGraph[curid].front;
        while (frontNode.type != ENodeType.START) {
            if (frontNode.id == aimId) { break; }
            else if (frontNode.type == ENodeType.INCLUSIVE || frontNode.type == ENodeType.PARALLEL) {
                return true;
            }
            frontNode = frontNode.front;
        }
        return false;
    }

    /**
     * 返回当前任务节点
     * @returns 
     */
    private getMapkeys(): string {
        let currentIdKeys = this.currentNodeMap.keys();
        let currentId = [...currentIdKeys].join(",");
        return currentId;
    }

    /**
     * 构建双向链表
     * @param nodes 
     */
    public buildLinkGraph() {
        let nodes = this.parseCfgStr(this.cfgStr);
        let seqs = [];
        for (let n of nodes) {
            switch (n.type) {
                case ENodeType.START:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.START);
                    break;
                case ENodeType.END:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.USERTASK);
                    break;
                case ENodeType.USERTASK:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.USERTASK);
                    break;
                case ENodeType.MODULETASK:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.MODULETASK);
                    break;
                case ENodeType.EXCLUSIVE:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.EXCLUSIVE);
                    break;
                case ENodeType.INCLUSIVE:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.INCLUSIVE);
                    break;
                case ENodeType.PARALLEL:
                    this.linkGraph[n.id] = new deLinkList(n.id, ENodeType.PARALLEL);
                    break;
                case ENodeType.SEQUENCE:
                    seqs.push(n);
                    break;
            }
        }
        //关联节点关系
        for (let n of seqs) {
            if (n.type == ENodeType.SEQUENCE) {
                this.linkGraph[n.src].last.push(this.linkGraph[n.dst]);
                this.linkGraph[n.dst].front.push(this.linkGraph[n.src]);
            }
        }
    }

    /**
     *获取任务
     * @param defId 
     * @returns 
     */
    public getTask(defId: string): NFTask {
        if (this.currentNodeMap.has(defId)) {
            return this.currentNodeMap.get(defId);
        }
    }

    /**
     * 获取当前流程所有任务
     * @returns 
     */
    public getAllNode(): NFTask[] {
        let taskArr = [];
        for (let k of this.currentNodeMap.keys()) {
            taskArr.push(this.currentNodeMap.get(k));
        }
        return taskArr;
    }
    /**
     * 设置流程变量
     * @param key '
     * @param value 
     */
    public async setParam(key: string, value: any) {
        if (key) {
            this.params[key] = value;
        }

        this.instance.variables = JSON.stringify(this.params);
        await this.instance.save();
    }
    /**
     * 获取任务的流程变量
     * @param gateDefId
     * @returns 
     */
    public async getParam(redo?: boolean) {
        let em: EntityManager = await getEntityManager();
        let query = em.createQuery(NfProcess.name);
        let procInst: NfProcess = await query.select(["*", "nfDefProcess"]).where({
            processId: this.getId()
        }).getResult()
        await em.close();
        this.instance = procInst;
        this.params = JSON.parse(this.instance.variables);
        return this.params;
    }
    /**
     * 获取网关的汇总顺序流个数
     * @param defId 
     * @returns 
     */
    public async getIncomParams(defId: string) {
        let em: EntityManager = await getEntityManager();
        let query = em.createQuery(NfProcess.name);
        let proc: NfProcess = await query.select(["*", "nfDefProcess"]).where({
            processId: this.getId()
        }).getResult()
        await em.close();
        proc.nfDefProcess = await proc.getNfDefProcess();
        this.instance = proc;
        let paral = proc.incomParams;
        if (paral) {
            var params = JSON.parse(paral);
        }
        if (params[defId]) {
            return params;
        }
    }

    /**
     * 设置网关的汇总顺序流个数（包容网管、并行网关）
     * @param defId 
     * @param value 
     */
    public async setIncomParams(defId: string, value: number) {
        this.instance.incomParams[defId] = value;
        await this.instance.save();
    }

    /**
     * 删除网关的汇总顺序流信息
     * @param defId 
     */
    public async deleteIncomParams(defId: string): Promise<void> {
        delete this.instance.incomParams[defId];
        await this.instance.save();
    }

    /**
     * 获取所有的任务节点
     * @returns 
     */
    public getTaskArr(): NFTask[] {
        let taskArr = [];
        for (let k of this.currentNodeMap.keys()) {
            taskArr.push(this.currentNodeMap.get(k))
        }
        return taskArr;
    }

    /**
     * 解析流程字符串
     * @param cfgStr 
     * @returns 
     */
    private parseCfgStr(cfgStr: string) {
        let cfg;
        try {
            cfg = JSON.parse(cfgStr);
            return cfg;
        } catch (e) {
            throw "流程定义错误!";
        }
    }

    /**
     * 执行任务监听器 
     * @param node 
     */
    public async doGlobalListner(node: NNode, type: string) {
        let listener;
        switch (type) {
            case eventListenType.START: listener = NFTaskListener.getStartListenerMap(node.listener); break;
            case eventListenType.END: listener = NFTaskListener.getEndListenerMap(node.listener); break;
            case eventListenType.TAKE: listener = NFTaskListener.getTakeListenerMap(node.listener); break;
        }
        const func = listener.prototype["notify"];
        await func.apply(listener.prototype.notify)
    }



}