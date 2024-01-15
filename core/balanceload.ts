import { NfHiNodeInst } from "./entity/nfhinodeinst";
import { NfHisTask } from "./nfhistask";
import { NFUserManager } from "./nfusermanager";

class AdaptiveLoadBalancing {
    public persons;
    public weights;
    constructor(persons) {
        this.persons = persons;
        this.weights = new Map();
        // 初始权重分配，可以根据实际情况设置
        for (const person of persons) {
            this.weights.set(person, 1);
        }
    }

    // 任务执行时间
    taskExecutionTime() {
        return Math.floor(Math.random() * 10) + 1; // 随机生成任务执行时间
    }

    // 动态调整任务分配权重
    async adjustWeights(userId) {
        for (const person of this.persons) {
            // 在实际应用中，根据任务执行时间、等指标进行动态调整
            const executionTime = this.taskExecutionTime();//执行时间
            const taskNum = await NFUserManager.getHandledNodes(userId);//待完成任务
            const finTask = await NfHisTask.getHisTask(userId);//以完成任务
            let weight = 1 / executionTime - taskNum / 100 + 1 / finTask;
            this.weights.set(person, weight);
        }
    }

    // 分配任务
    async assignTask(userId) {
        // 根据权重分配任务
        const sortedPersons = [...this.persons].sort((a, b) => this.weights.get(b) - this.weights.get(a));
        const assignedPerson = sortedPersons[0];

        // console.log(`Task ${task} assigned to ${assignedPerson}`);

        // // 模拟任务执行
        const executionTime = this.taskExecutionTime();
        // console.log(`Task ${task} executed by ${assignedPerson} in ${executionTime} seconds`);

        // 调整权重
        await this.adjustWeights(userId);
    }
}

// 初始人员列表
const persons = ["Person1", "Person2", "Person3"];

// 创建自适应负载均衡对象
const loadBalancer = new AdaptiveLoadBalancing(persons);

// 模拟分配10个任务
for (let task = 1; task <= 10; task++) {
    loadBalancer.assignTask(task);
}

