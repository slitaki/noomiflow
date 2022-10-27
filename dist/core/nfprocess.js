"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFProcess = void 0;
const nendnode_1 = require("./node/nendnode");
const nsequencenode_1 = require("./node/nsequencenode");
const nstartnode_1 = require("./node/nstartnode");
const types_1 = require("./types");
const nexclusivenode_1 = require("./node/nexclusivenode");
const ninclusivenode_1 = require("./node/ninclusivenode");
const nparallelnode_1 = require("./node/nparallelnode");
const nusertasknode_1 = require("./node/nusertasknode");
const ntasknode_1 = require("./node/ntasknode");
const nfnode_1 = require("./entity/nfnode");
/**
 * 流程类
 */
class NFProcess {
    constructor(cfg, inst) {
        /**
         * 流程参数
         */
        this.params = {};
        this.handleNodes(cfg);
        this.instance = inst;
    }
    /**
     * 处理节点
     * @param nodes
     * @returns
     */
    handleNodes(nodes) {
        const rNodes = [];
        for (let n of nodes) {
            let node;
            switch (n.type) {
                case types_1.ENodeType.START:
                    node = new nstartnode_1.NStartNode(n, this);
                    break;
                case types_1.ENodeType.END:
                    node = new nendnode_1.NEndNode(n, this);
                    break;
                case types_1.ENodeType.USERTASK:
                    node = new nusertasknode_1.NUserTaskNode(n, this);
                    break;
                case types_1.ENodeType.SEQUENCE:
                    node = new nsequencenode_1.NSequenceNode(n, this);
                    break;
                case types_1.ENodeType.EXCLUSIVE:
                    node = new nexclusivenode_1.NExclusiveNode(n, this);
                    break;
                case types_1.ENodeType.INCLUSIVE:
                    node = new ninclusivenode_1.NInclusiveNode(n, this);
                    break;
                case types_1.ENodeType.PARALLEL:
                    node = new nparallelnode_1.NParallelNode(n, this);
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
    getParam(key) {
        if (!this.params) {
            return;
        }
        if (key) {
            return this.params[key];
        }
        return this.params;
    }
    /**
     * 保存参数
     * @param key       key
     * @param value     值
     */
    setParam(key, value) {
        if (key) {
            this.params[key] = value;
        }
        else {
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
        const node = this.nodes.find(item => item instanceof nstartnode_1.NStartNode);
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
        await this.instance.save();
    }
    /**
     * 获取节点
     * @param name  节点名称
     * @returns     节点
     */
    getNode(name) {
        return this.nodes.find(item => item.name === name);
    }
    /**
     * 设置当前节点
     * @param node
     */
    async setCurrentNode(node) {
        this.currentNode = node;
        //设置当前变量
        if (node instanceof ntasknode_1.NTaskNode) {
            //更换流程实例当前节点名
            this.instance.nodeName = node.name;
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
    async next(cfg) {
        //当前任务名
        let cName;
        if (this.currentNode && this.currentNode instanceof ntasknode_1.NTaskNode) {
            await this.currentNode.finish(cfg);
            cName = this.currentNode.name;
        }
        else {
            const node = this.getNode(this.instance.nodeName);
            await node.finish(cfg);
            cName = this.instance.nodeName;
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(cName);
        if (seq) {
            await seq.run();
        }
    }
    /**
     * 获取顺序流节点
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(name, isDst) {
        if (isDst) {
            return this.nodes.find(item => item['dst'] === name);
        }
        return this.nodes.find(item => item['src'] === name);
    }
    /**
     * 获取顺序流节点集合，主要用于网关
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNodes(name, isDst) {
        if (isDst) {
            return this.nodes.filter(item => item['dst'] === name);
        }
        return this.nodes.filter(item => item['src'] === name);
    }
    /**
     * 获取所有任务节点及资源
     * @param procId    流程id
     * @returns         节点集合
     */
    async getAllNodes(procId) {
        //从数据库获取
        const nodes = await nfnode_1.NfNode.findMany({ nfProcess: procId });
        //获取资源
        for (let n of nodes) {
            await n.getNfResources();
        }
        return nodes;
    }
}
exports.NFProcess = NFProcess;
//# sourceMappingURL=nfprocess.js.map