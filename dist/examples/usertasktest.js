"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relaen_1 = require("relaen");
const nfengine_1 = require("../core/nfengine");
const nfusermanager_1 = require("../core/nfusermanager");
const relaenconfig_1 = require("./relaenconfig");
/**
 * 定义流程
 */
async function defineProcess() {
    const path = require('path').resolve('./test/flows/flow1.json');
    const str = require('fs').readFileSync(path);
    const json = JSON.parse(str);
    await nfengine_1.NFEngine.defineProcess(json);
}
/**
 * 创建流程
 */
async function createProcess() {
    await nfengine_1.NFEngine.createProcess('测试流程2', '测试流程2-管理员提交-20221010', 1);
}
/**
 * 测试
 */
(async function () {
    relaen_1.RelaenManager.init(relaenconfig_1.RelaenConfig);
    // await defineProcess();
    // await createProcess();
    //获取流程实例
    // const proc = await NFEngine.getInstance(8,1);
    // proc.start();
    // 取用户的未处理流程
    // const nodes = await NFUserManager.getUnHandleNodes(1);
    // console.log(nodes);
    // 执行节点，根据参数直接end
    // const proc = await NFEngine.getInstance(nodes.rows[2].nfProcess.processId,1);
    // proc.setParam('data',1);
    // await proc.next({userId:1});
    //根据参数跳转到task2
    // const proc = await NFEngine.getInstance(nodes.rows[2].nfProcess.processId,1);
    // proc.setParam('data',2);
    // await proc.next({userId:1});
    //task2审核不通过
    const nodes = await nfusermanager_1.NFUserManager.getUnHandleNodes(2);
    const proc = await nfengine_1.NFEngine.getInstance(nodes.rows[0].nfProcess.processId, 2);
    proc.setParam('agree', 0);
    await proc.next({ userId: 2, agree: 0, reason: '资料不齐' });
    //task2 审核通过，结束
    // const nodes = await NFUserManager.getUnHandleNodes(2);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId,2);
    // proc.setParam('agree',1);
    // await proc.next({userId:2,agree:1,reason:'审核通过'});
})();
//# sourceMappingURL=usertasktest.js.map