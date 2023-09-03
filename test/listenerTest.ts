import { NFEngine } from "../core/nfengine";
import { NFProcess } from "../core/nfprocess";
import { NFTask } from "../core/nftask";

async function test() {
    await NFEngine.init()
    // await NFEngine.deployProcess("examples/flows/flow5.json");
    let process: NFProcess = await NFEngine.createProcess("流程监听测试", "监听测试9-3");
    await process.start();
    let task: NFTask = process.getTask("task1");
    await task.setVariables("data", 2);
    await process.next("task1");
    let task1 = process.getTask("task2");
    await task1.setVariables("agree", 1);
    await process.next(task1.getDefId());

};
test();
