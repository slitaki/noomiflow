import { NEndNode } from "./node/nendnode";
import { NNode } from "./node/nnode";
import { NSequenceNode } from "./node/nsequencenode";
import { NStartNode } from "./node/nstartnode";
import { ENodeType, INode } from "./types";
import { NExclusiveNode } from "./node/nexclusivenode";
import { NInclusiveNode } from "./node/ninclusivenode";
import { NParallelNode } from "./node/nparallelnode";
import { NfProcess } from "./entity/nfprocess";
import { NUserTaskNode } from "./node/nusertasknode";
import { NTaskNode } from "./node/ntasknode";
import { NfNode } from "./entity/nfnode";
import { NModuleNode } from "./node/nmodulenode";
import { NFTask } from "./nftask";
/**
 * 流程类
 */
export class NFProcess {
    /**
     * 流程节点集合
     */
    public nodes: NNode[];

    /**
     * 当前任务节点 并行网关等 流程会有多个任务节点
     */
    private currentNodeMap: Map<string, NFTask> = new Map();
    /**
0     * 流程参数
     */
    private params: any = {};
    /**
     * 流程实体
     */
    public instance: NfProcess;
    /**
     * 当前用户id
     */
    public userId: number;

    constructor(cfg, inst?: NfProcess) {
        this.handleNodes(cfg);
        this.instance = inst;
    }

    /**
     * 处理节点
     * @param nodes 
     * @returns 
     */
    handleNodes(nodes: INode[]) {
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
     * 对有init方法的节点执行init
     */
    doNodeInit() {
        for (let node of this.nodes) {
            if (node['init']) {
                node['init'].apply(node);
            }
        }
    }

    /**
     * 获取参数
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getParam(key?: string) {
        if (!this.params) {
            return; //判断 todo
        }
        if (key) {
            return this.params[key];
        }
        return this.params;
    }

    /**
     * 设置流程变量
     * @param key       key
     * @param value     值
     */
    async setVariablesParam(key: string, value: any) {
        if (key) {
            this.params[key] = value;
        } else {
            this.params = value;
        }
        //更改参数保存到流程实例中
        this.instance.variables = JSON.stringify(this.params);
        await this.instance.save();
    }

    /**
     * 开始流传
     */
    async start() {
        const node = this.nodes.find(item => item instanceof NStartNode);
        if (this.instance.startTime) {
            throw "流程已开始";
        }
        if (this.instance.endTime) {
            throw "流程已结束";
        }
        if (this.instance.deleteTime) {
            throw "流程已关闭";
        }
        //修改开始时间
        this.instance.startTime = new Date().getTime();
        await this.instance.save();
        if (!node) {
            throw "流程无开始节点";
        }
        await node.run();
    }

    /**
     * 结束 该process 下所有节点任务同样关闭
     */
    async end() {
        this.currentNodeMap.clear();
        this.instance.endTime = new Date().getTime();
        this.instance.handleTime = this.instance.endTime - this.instance.startTime;
        await this.instance.save();
    }

    /**
     * 获取节点
     * @param id    节点id 
     * @returns     节点
     */
    getNode(id: string): NNode {
        return this.nodes.find(item => item.id === id);
    }

    /**
     * 设置当前节点
     * @param node 
     */
    async setCurrentNode(node: NNode) {
        //设置当前变量
        if (node instanceof NTaskNode) {
            let currentTask = new NFTask(node);
            //任务节点加入当前任务节点map
            this.currentNodeMap.set(currentTask.getDefId(), currentTask);
            //修改实体当前任务节点
            this.instance.currentId = this.getMapkeys();
            await this.instance.save();
            if (node.nfNode && node.nfNode.variables) {
                this.params = JSON.stringify(node.nfNode.variables);
            }
        }
    }

    /**
     * 用于恢复流程实例所有当前的任务节点
     */
    async recoverMap() {
        let nodeId = this.getId();
        let nfNodes: NfNode[] = await this.getAllNodes(nodeId);
        let nodeArr: NfNode[] = [];
        //查找所有未完成的任务
        for (let n of nfNodes) {
            if (!n.endTime) {
                nodeArr.push(n);
            }
        }
        //将所有节点放入currentNodeMap中
        for (let node of nodeArr) {
            let nodeInstance = this.getNode(node.defId);
            if (nodeInstance instanceof NTaskNode) {
                //此时节点实例需要加入节点实体
                nodeInstance.nfNode = node;
                let currentTask = new NFTask(nodeInstance);
                this.currentNodeMap.set(currentTask.getDefId(), currentTask);
            }
        }
    }

    /**
     * 执行下一节点
     * @param id  节点id
     * @param cfg 
     */
    async next(id: string, cfg?: object) {
        //任务节点
        let node: NFTask = this.currentNodeMap.get(id);
        if (node) {
            var nid = node.getDefId();
            await node.finish(cfg);

        } else {
            throw ("当前流程实例无该任务!");
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(nid);
        if (seq) {
            await seq.run();
        }
        //从map中删除该节点
        this.currentNodeMap.delete(id);
        this.instance.currentId = this.getMapkeys();
        await this.instance.save();
        this.params = null;
    }

    /**
     * 获取顺序流节点
     * @param id        src 或 dst节点id
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(id: string, isDst?: boolean): NSequenceNode {
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
    getSequenceNodes(id: string, isDst?: boolean): NSequenceNode[] {
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
    async getAllNodes(procId: number) {
        //从数据库获取
        const nodes: NfNode[] = <NfNode[]>await NfNode.findMany({ nfProcess: procId });
        //获取资源
        for (let n of nodes) {
            await n.getNfResources();
        }
        return nodes;
    }
    //创建子流程 todo
    async createChildProcess() {
    }


    /**
     * 获取当前流程实例实体的流程id
     * @returns 
     */
    public getId(): number {
        return this.instance.processId;
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
}