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
/**
 * 流程类
 */
export class NFProcess{
    /**
     * 流程节点集合
     */
    public nodes: NNode[];

    /**
     * 当前任务节点
     */
    private currentNode:NNode;

    /**
     * 流程参数
     */
    private params:any = {};

    /**
     * 流程实体
     */
    public instance:NfProcess;

    /**
     * 当前用户id
     */
    public userId:number;
    
    constructor(cfg,inst?:NfProcess){
        this.handleNodes(cfg);
        this.instance = inst;
    }

    /**
     * 处理节点
     * @param nodes 
     * @returns 
     */
    handleNodes(nodes:INode[]){
        const rNodes = [];
        for(let n of nodes){
            let node;
            switch(n.type){
                case ENodeType.START:
                    node = new NStartNode(n,this);
                    break;
                case ENodeType.END:
                    node = new NEndNode(n,this);
                    break;
                case ENodeType.USERTASK:
                    node = new NUserTaskNode(n,this);
                    break;
                case ENodeType.SEQUENCE:
                    node = new NSequenceNode(n,this);
                    break;
                case ENodeType.EXCLUSIVE:
                    node = new NExclusiveNode(n,this);
                    break;
                case ENodeType.INCLUSIVE:
                    node = new NInclusiveNode(n,this);
                    break;
                case ENodeType.PARALLEL:
                    node = new NParallelNode(n,this);
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
    doNodeInit(){
        for(let node of this.nodes){
            if(node['init']){
                node['init'].apply(node);
            }   
        }
    }

    /**
     * 获取参数
     * @param key   参数名，如果没有则表示整个参数对象
     */
    getParam(key?:string){
        if(!this.params){
            return;
        }
        if(key){
            return this.params[key];
        }
        return this.params;
    }

    /**
     * 保存参数
     * @param key       key
     * @param value     值
     */
    setParam(key:string,value:any){
        if(key){
            this.params[key] = value;
        }else{
            this.params = value;
        }
        //更改参数保存到流程实例中
        this.instance.variables = JSON.stringify(this.params);
        this.instance.save();
    }

    /**
     * 开始流传
     */
    async start(){
        const node = this.nodes.find(item=>item instanceof NStartNode);
        if(!node){
            throw "流程无开始节点";
        }
        await node.run();
    }

    /**
     * 结束
     */
    async end(){
        delete this.currentNode;
        this.instance.endTime = new Date().getTime();
        await this.instance.save();
    }

    /**
     * 获取节点
     * @param name  节点名称 
     * @returns     节点
     */
    getNode(name:string):NNode{
        return this.nodes.find(item=>item.name === name);
    }

    /**
     * 设置当前节点
     * @param node 
     */
    async setCurrentNode(node:NNode){
        this.currentNode = node;
        //设置当前变量
        if(node instanceof NTaskNode){
            //更换流程实例当前节点名
            this.instance.nodeName = node.name;
            await this.instance.save();
            if(node.nfNode && node.nfNode.variables){
                this.params = JSON.stringify(node.nfNode.variables);
            }
        }
    }

    /**
     * 执行下一个节点
     * @param cfg       配置
     * @returns 
     */
    async next(cfg?:object){
        //当前任务名
        let cName;
        if(this.currentNode && this.currentNode instanceof NTaskNode){
            await this.currentNode.finish(cfg);
            cName = this.currentNode.name;
        }else{
            const node = <NTaskNode>this.getNode(this.instance.nodeName);
            await node.finish(cfg);
            cName = this.instance.nodeName;
        }
        //执行下个流程节点
        let seq = this.getSequenceNode(cName);
        if(seq){
            await seq.run();
        }
    }

    /**
     * 获取顺序流节点
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNode(name:string,isDst?:boolean):NSequenceNode{
        if(isDst){
            return <NSequenceNode>this.nodes.find(item=>item['dst'] === name);
        }
        return <NSequenceNode>this.nodes.find(item=>item['src'] === name);
    }

    /**
     * 获取顺序流节点集合，主要用于网关
     * @param name      src 或 dst节点名
     * @param isDst     如果name为dst，则该项为true
     */
    getSequenceNodes(name:string,isDst?:boolean):NSequenceNode[]{
        if(isDst){
            return <NSequenceNode[]>this.nodes.filter(item=>item['dst'] === name);
        }
        return <NSequenceNode[]>this.nodes.filter(item=>item['src'] === name);
    }

    /**
     * 获取所有任务节点及资源
     * @param procId    流程id
     * @returns         节点集合
     */
    async getAllNodes(procId:number){
        //从数据库获取
        const nodes:NfNode[] = <NfNode[]>await NfNode.findMany({nfProcess:procId});
        //获取资源
        for(let n of nodes){
            await n.getNfResources();
        }
        return nodes;
    }

    
}