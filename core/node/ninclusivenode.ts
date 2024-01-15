import { NNode } from "./nnode";
import { INode, deLinkList } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";

/**
 * 包容网关
 */
export class NInclusiveNode extends NNode {
    outSequences: NSequenceNode[];
    inSequences: NSequenceNode[];
    /**
     * 出口顺序流
     */
    sequences: NSequenceNode[];

    constructor(cfg: INode, process: NFProcess) {
        super(cfg, process);
    }

    async run() {
        let tasks = this.process.getTaskArr();
        //网关等待状态默认true ，false 表示网关可以进行下一步
        let isWating = true;
        if (tasks.length != 0) { //当前流程存在待执行任务节点
            for (let t of tasks) {
                if (this.isChildNode(t.getDefId(), this.id)) {
                    isWating = !isWating;
                    break;
                }
            }
        }
        if (!isWating || tasks.length == 0) { //网关激活，执行到下一步
            for (let node of this.outSequences) {
                await node.run();
            }
        }
    }

    init() {
        this.outSequences = this.process.getSequenceNodes(this.id);
        this.inSequences = this.process.getSequenceNodes(this.id, true);
        if (!this.outSequences || this.outSequences.length === 0 || !this.inSequences || this.inSequences.length === 0) {
            throw `节点'${this.name}'配置错误!`;
        }
    }

    /**
     * 判断包容网管是否是任务节点的子节点
     */
    private isChildNode(taskDefId: string, exgateDefId: string) {
        if (Object.keys(this.process.linkGraph).length == 0) {
            this.process.buildLinkGraph();
        }
        let linkGraph = this.process.linkGraph;
        //层序遍历
        let listArr: deLinkList[] = [];
        let vistedMap: Map<string, boolean> = new Map();
        listArr.concat(linkGraph[taskDefId].last);
        while (listArr.length != 0) {
            let node: deLinkList = listArr.shift();
            if (!vistedMap.get(node.id)) {
                if (node.id == exgateDefId) { //是子节点
                    return true;
                } 0
                if (!vistedMap.get(node.id)) {//未遍历过该节点
                    listArr = listArr.concat(node.last);
                    vistedMap.set(node.id, true);
                }
            }
        }
        return false;
    }
}