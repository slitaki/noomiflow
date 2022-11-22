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
/**
 * 流程类
 */
export class NFProcess {
    /**
     * 流程节点集合
     */
    public nodes: NNode[];

    /**
     * 当前任务节点
     */
    private currentNode: NNode;

    /**
     * 流程参数
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
            return;
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
    setVariablesParam(key: string, value: any) {
        if (key) {
            this.params[key] = value;
        } else {
            this.params = value;
        }
        //更改参数保存到流程实例中
        this.instance.variables = JSON.stringify(this.params);
        this.instance.save();
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
     * 结束
     */
    async end() {
        delete this.currentNode;
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
        this.currentNode = node;
        //设置当前变量
        if (node instanceof NTaskNode) {
            //更换流程实例当前节点名
            this.instance.currentId = node.id;
            await this.instance.save();
            if (node.nfNode && node.nfNode.variables) {
                this.params = JSON.stringify(node.nfNode.variables);
            }
        }
    }

    /**
     * 执行下一个节点
     * @param cfg       配置
     * @returns 
     */
    async next(cfg?: object) {
        //当前任务id
        let nid;
        if (this.currentNode) {
            nid = this.currentNode.id;
            if (this.currentNode instanceof NTaskNode) {
                await this.currentNode.finish(cfg);
            }
        } else {
            const node = <NTaskNode>this.getNode(this.instance.currentId);
            await node.finish(cfg);
            nid = this.instance.currentId;
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(nid);
        if (seq) {
            await seq.run();
        }
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


    //创建子流程
    async createChildProcess() {

    }

    public getId(): number {
        return this.instance.processId;
    }
}