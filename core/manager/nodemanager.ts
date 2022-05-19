import { FlowNode } from "../node/basenode";

/**
 * 流程节点管理器
 * 用于管理流程节点类
 */
export class NodeManager{
    /**
     * 节点类管理器
     */
    private static nodeClassMap:Map<string,any> = new Map();
    /**
     * 注册节点类
     * @param clazz 节点类 
     * @param name  注册类名，默认为类名
     */
    public static registClass(clazz:any,name?:string){
        this.nodeClassMap.set(name||clazz.name,clazz);
    }   

    /**
     * 获取节点类
     * @param name  节点类名
     * @returns     节点类
     */
    public static getClass(name:string){
        return this.nodeClassMap.get(name);
    }

    /**
     * 获取节点实例
     * @param name      类名
     * @param config    实例初始化配置
     * @returns         创建后的实例
     */
    public static getInstance(name:string,config:object):FlowNode{
        let clazz = this.getClass(name);
        if(!clazz){
            return;
        }
        return Reflect.construct(clazz,[config]);
    }
}