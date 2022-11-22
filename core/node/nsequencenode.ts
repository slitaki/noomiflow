import { NExpression } from "../expression";
import { NFProcess } from "../nfprocess";
import { NNode } from "./nnode";
import { NParallelNode } from "./nparallelnode";

export class NSequenceNode extends NNode {
    /**
     * 表达式处理器
     */
    expr: NExpression;

    /**
     * 源节点
     */
    src: string;

    /**
     * 目标节点
     */
    dst: string;

    constructor(cfg, process: NFProcess) {
        super(cfg, process);
        this.src = cfg.src;
        this.dst = cfg.dst;
        if (cfg.cond) {
            this.expr = new NExpression(cfg.cond);
        }
    }

    async run(): Promise<any> {
        const node = this.process.getNode(this.dst);
        if (!node) {
            throw '目标节点不存在';
        }
        //并行网关，不执行条件
        if (node instanceof NParallelNode) {
            await node.run();
        } else if (!this.expr || this.expr.val(this.process.getParam())) {
            await node.run();
        } else {
            return false;
        }
        return true;
    }
}