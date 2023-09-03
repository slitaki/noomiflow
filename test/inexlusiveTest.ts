import { NFEngine } from "../core/nfengine";

//包容网关测试
async function main() {
    await NFEngine.init()
    //(1)部署一个流程
    // let definc = await NFEngine.deployProcess("./examples/flows/flow4.json")
    // console.log("部署成功!    ID:" + definc.getProDefID());
    // (2)开始流程
    let defkey: string = "合同审核流程";
    let proc = await NFEngine.createProcess(defkey, "这是一个合同审核流程");
    let procId = proc.getId();
    console.log("启动了一个ID为" + procId + "的流程实例");
    let procinst = await NFEngine.getInstanceById(procId);
    await procinst.start();
    var tasks = procinst.getAllNode();
    while (tasks.length > 0) {
        for (var t in tasks) {
            await tasks[t].setVariables('money', 5200);
            await procinst.next(tasks[t].getDefId());
            console.log("任务" + tasks[t].getName() + " 执行完成!");
            console.log("=====================================");
        }
        tasks = procinst.getAllNode();
        console.log("=====下一阶段任务=====");
    }
    console.log("流程实例：" + procId + "执行完成");
}
main();