import { Tools } from "./tools";
import { ENodeType, deLinkList } from "./types";

//校验类
export class VarifyTool {
    public varifyModel(procCfg) {
        let flow = Tools.parseCfgStr(procCfg);
        if (!flow.name) {
            return false;
        }
        let linkGraph = {}
        let seqs = [];
        for (let n of flow) {
            switch (n.type) {
                case ENodeType.START:
                    if (!this.varifyStart()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.START);
                    break;
                case ENodeType.END:
                    if (!this.varifyEnd()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.USERTASK);
                    break;
                case ENodeType.SEQUENCE:
                    if (!this.varifysequence()) return false;
                    seqs.push(n);
                    break;
                case ENodeType.USERTASK:
                    if (!this.varifyUserTask()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.USERTASK);
                    break;
                case ENodeType.MODULETASK:
                    if (!this.varifyModuleTask()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.MODULETASK);
                    break;
                case ENodeType.EXCLUSIVE:
                    if (!this.varifyExclusive()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.MODULETASK);
                    break;
                case ENodeType.INCLUSIVE:
                    if (!this.varifyInclusive()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.MODULETASK);

                    break;
                case ENodeType.PARALLEL:
                    if (this.varifyParallel()) return false;
                    linkGraph[n.id] = new deLinkList(n.id, ENodeType.MODULETASK);
                    break;
            }

        }
        //关联节点关系
        for (let n of seqs) {
            if (n.type == ENodeType.SEQUENCE) {
                linkGraph[n.src].last.push(linkGraph[n.dst]);
                linkGraph[n.dst].front.push(linkGraph[n.src]);
            }
        }
        let listArr: deLinkList[] = [];
        let vistedMap: Map<string, boolean> = new Map();
        listArr.concat(linkGraph["START"].last);
        while (listArr.length != 0) {
            let node: deLinkList = listArr.shift();
            if (!vistedMap.get(node.id)) {

                if (!vistedMap.get(node.id)) {//未遍历过该节点
                    listArr = listArr.concat(node.last);
                    vistedMap.set(node.id, true);
                } else {
                    return false;
                }
            }
        }
        if (vistedMap.size != flow.nodes.length) return false;
        return true;

    }



    private varifyStart() { return true };
    private varifyEnd() { return true };
    private varifysequence() { return true };
    private varifyUserTask() { return true };
    private varifyModuleTask() { return true };
    private varifyExclusive() { return true };
    private varifyParallel() { return true };
    private varifyInclusive() { return true }
}