"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relaen_1 = require("relaen");
const nfengine_1 = require("../core/nfengine");
const relaenconfig_1 = require("./relaenconfig");
async function defineProcess() {
    const path = require('path').resolve('./test/flows/flow1.json');
    const str = require('fs').readFileSync(path);
    const json = JSON.parse(str);
    await nfengine_1.NFEngine.defineProcess(json);
}
async function createProcess() {
    await nfengine_1.NFEngine.createProcess('测试流程1', '测试流程1-管理员提交', 1);
}
(async function () {
    relaen_1.RelaenManager.init(relaenconfig_1.RelaenConfig);
    // await defineProcess();
    // await createProcess();
    // const proc = await NFEngine.getInstance(5,1);
    // console.log(proc)
    // proc.start();
    // 取用户的未处理流程
    // const nodes = await NFEngine.getUserProcess(1,0);
    // console.log(nodes);
    // 执行节点，根据参数直接end
    // const proc = await NFEngine.getInstance(nodes[0].nfProcess.processId,1);
    // proc.setParam('data',1);
    // await proc.next();
    //根据参数跳转到task2
    // const proc = await NFEngine.getInstance(nodes[0].nfProcess.processId,1);
    // proc.setParam('data',2);
    // await proc.next();
    //task2审核不通过
    // const nodes = await NFEngine.getUserProcess(2,0);
    // const proc = await NFEngine.getInstance(nodes[0].nfProcess.processId,2);
    // proc.setParam('agree',0);
    // await proc.next({userId:2,agree:0,reason:'资料不齐'});
    //task2 审核通过，结束
    const nodes = await nfengine_1.NFEngine.getUserProcess(2, 0);
    const proc = await nfengine_1.NFEngine.getInstance(nodes[0].nfProcess.processId, 2);
    proc.setParam('agree', 1);
    await proc.next({ userId: 2, agree: 1, reason: '审核通过' });
})();
//# sourceMappingURL=proctest.js.map