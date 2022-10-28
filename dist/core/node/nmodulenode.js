"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NModuleNode = void 0;
const nnode_1 = require("./nnode");
/**
 * 可执行模块节点
 * 定义方法
 * @param process   当前流程
 * module.exports = function(process){
 *    //your code
 *      ....
 *    //可把结果写到process参数中
 *
 * }
 */
class NModuleNode extends nnode_1.NNode {
    constructor(cfg, process) {
        super(cfg, process);
        this.modulePath = cfg.path;
    }
    async run() {
        await super.run();
        try {
            const parser = await Promise.resolve().then(() => require(this.modulePath));
            await parser(this.process);
            this.process.next();
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.NModuleNode = NModuleNode;
//# sourceMappingURL=nmodulenode.js.map