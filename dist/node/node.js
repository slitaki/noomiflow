"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFNode = void 0;
/**
 * 工作流基础节点
 */
class NFNode {
    /**
     * 构造器
     * @param id    节点id
     * @param name  节点名
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    /**
     * 节点执行
     * @param model     传递的数据模型，可为空
     */
    run(model) {
    }
}
exports.NFNode = NFNode;
//# sourceMappingURL=node.js.map