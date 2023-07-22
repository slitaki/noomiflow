import { error } from "console";
import { ENodeType, GatewayType, NFlowNode, NfType, TaskType } from "./types";

//XML解析器
export class NFResolver {
    static fs = require('fs');
    /**
     * 解析流程XML
     * @param src xml模型文件路径
     */
    public static async resolveXML(src: string) {
        const xmlPath: string = src;
        //读取xml文本信息
        let xmlFile: string = this.fs.readFileSync(xmlPath, { encoding: "utf8", flag: "r" }).toString();
        //截取precess 部分信息
        const regxp = new RegExp(/<process+[\s\S]*(<\/process>)/)
        let content: string[] = xmlFile.match(regxp);
        if (!content) {
            throw error("部署流程不包含顺序流信息");
        }
        let flowContent: string = content[0];
        const xmlreader = require("xmlreader"); // xmlreader包用于将xml转为对象
        //获取流程信息
        let xmlObject: any = await this.getXmlObject(xmlreader, flowContent);
        let process = xmlObject.process;
        //初始化节点信息
        let nodes = { name: "", nodes: [] }
        //name属性
        nodes.name = process.attributes().name;
        //处理开始节点
        let startNode = this.getStartEvent(process.startEvent);
        nodes.nodes.push(startNode);
        //处理结束节点
        let endNode = this.getEndEvent(process.endEvent);
        nodes.nodes = nodes.nodes.concat(endNode);
        //处理任务节点  目前支持三种任务节点
        for (let taskTp of TaskType) {
            if (taskTp in process) {
                let task = this.handleTaskNode(process[taskTp], NfType[taskTp]);
                nodes.nodes = nodes.nodes.concat(task);
            }
        }
        //处理网关系节点
        for (let GatewayTp of GatewayType) {
            if (GatewayTp in process) {
                let gateNodes = this.handleGateway(process[GatewayTp], NfType[GatewayTp]);
                nodes.nodes = nodes.nodes.concat(gateNodes);
            }
        }
        //处理顺序流节点
        let sqFlows = this.handleSquence(process.sequenceFlow);
        nodes.nodes = nodes.nodes.concat(sqFlows);
        this.fs.writeFileSync('./' + nodes.name + ".json", JSON.stringify(nodes))
    }

    /**
     * 处理顺序流
     * @param sequenceFlow 
     * @returns  NFlowNode[] 顺寻流数组
     */
    private static handleSquence(sequenceFlow: any): NFlowNode[] {
        var sqFlow; //顺序流
        if (!sequenceFlow.array) {//数组
            sqFlow = new Array();
            sqFlow.push(sequenceFlow);
        } else {
            sqFlow = sequenceFlow.array;
        }
        let sequenceArr: NFlowNode[] = [];
        for (let sequence of sqFlow) {
            let sqe: NFlowNode = new NFlowNode(); //构建对象
            sqe.type = ENodeType.SEQUENCE;
            sqe.id = sequence.attributes().id;
            if (sequence.conditionExpression) { //包含表达式
                sqe.cond = sequence.conditionExpression.text();
            }
            if (sequence.attributes().name) { //可选name 属性
                sqe.name = sequence.attributes().name;
            }
            sqe.src = sequence.attributes().sourceRef;
            sqe.dst = sequence.attributes().targetRef;
            sequenceArr.push(sqe);
        }
        return sequenceArr;
    }

    /**
     * 处理任务节点 
     * @param tasks 
     * @param taskType 
     * @returns 
     */
    private static handleTaskNode(tasks: any, taskType: ENodeType): NFlowNode[] {
        // 函数任务需要加上 函数任务 todo
        // if (taskType == ENodeType.MODULETASK) {
        // }
        var taskNode; //后续遍历的任务节点
        if (!tasks.array) { //不是数组
            taskNode = new Array();
            taskNode.push(tasks);
        } else {
            taskNode = tasks.array;
        }
        let taskArr = [];
        for (let task of taskNode) {//遍历数组
            let taskNode: NFlowNode = new NFlowNode();
            taskNode.type = taskType;
            taskNode.id = task.attributes().id;
            if (task.attributes().name) { //可选name 属性
                taskNode.name = task.attributes().name;
            }
            taskNode.src = task.incoming.text();
            taskNode.dst = task.outgoing.text();
            taskArr.push(taskNode);
        }
        return taskArr;
    }

    /**
     * 处理网关
     * @param gateways 
     * @param gatewayType
     * @returns 
     */
    private static handleGateway(gateways: any, gatewayType: ENodeType) {
        var gatewayArr = new Array();
        if (!gateways.array) {
            gatewayArr.push(gateways);
        } else {
            gatewayArr = gateways.array;
        }
        let gatewayNodes = [];
        for (let gatew of gatewayArr) {
            let gatewNode = new NFlowNode();
            gatewNode.id = gatew.attributes().id;
            gatewNode.type = gatewayType;
            if (gatew.attributes().name) {
                gatewNode.name = gatew.attributes().name;
            }
            gatewayNodes.push(gatewNode);
        }
        return gatewayNodes;
    }

    /**
     * 获取开始节点 
     * @param startEvent 
     * @returns 
     */
    private static getStartEvent(startEvent: any): NFlowNode {
        if (startEvent.isArray) {
            throw error("多个开始节点");
        }
        //todo 多个开始节点报错
        let startNode: NFlowNode = new NFlowNode();
        startNode.type = ENodeType.START;
        if (startEvent.attributes().name) {
            startNode.name = startEvent.attributes().name
        }
        startNode.id = startEvent.attributes().id;
        return startNode;
    }

    /**
     * 获取结束节点
     * @param endEvent 
     * @returns 
     */
    private static getEndEvent(endEvent: any): NFlowNode[] {
        var endArr;
        if (!endEvent.array) { //单个结束节点
            endArr = new Array();
            endArr.push(endEvent);
        } else {
            endArr = endEvent.array;
        }
        let endNodes: NFlowNode[] = [];
        for (let endE of endArr) {
            let endNode: NFlowNode = new NFlowNode();
            endNode.type = ENodeType.END;
            endNode.id = endE.attributes().id;
            endNodes.push(endNode);
        }
        return endNodes;
    }

    /**
     *  处理子流程 todo
     * @param subProcess 
     */
    public static getsubProcess(subProcess) {

    }

    /**
     * 获取xml对象
     * @param reader  获取xmlreader 的read方法
     * @param bpmnFlow  process标签字符串
     * @returns 
     */
    private static async getXmlObject(reader, bpmnFlow) {
        return new Promise((res, rej) => {
            reader.read(bpmnFlow, function (err, result) {
                if (err) {
                    rej(err)
                }
                if (result != undefined) {
                    res(result);
                }
            })
        })
    }
}
/** xmlreader 相关方法用法
 * 各方法含义：

1、attributes：获取所有属性。

2、parent：获取父节点。

3、count：获取数目。

4、at：获取下标为指定值的节点。

5、each：遍历，参数为一个函数。

6、text：获取节点内的文本，仅当前节点的文本，不包含子节点的文本。
 */