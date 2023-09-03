export class NFTaskListener {
    /**全局监听器Map */
    private static startListenerMap: Map<string, any> = new Map();
    private static endListenerMap: Map<string, any> = new Map();
    private static takeListenerMap: Map<string, any> = new Map();

    /**
     * 初始化监听器
     * @param cfg 
     */
    public static initListenerMap(cfg: any) {
        const fs = require('fs');
        const pathMdl = require('path');
        const dir = fs.readdirSync(cfg.listenerPath, { withFileTypes: true });
        let reg: RegExp = new RegExp(/.*\.js$/);
        for (const file of dir) {
            if (file.isFile()) {
                if (reg.test(file.name)) {
                    import(pathMdl.resolve(cfg.listenerPath, file.name));
                }

            }
        }

    }
    /**
     * 设置start状态监听器
     * @param listener 
     * @param clazz 
     */
    public static setStartListMap(listener: string, clazz: any) {
        this.startListenerMap.set(listener, clazz)
    };
    /**
     * 获得Start状态监听器
     * @param listener 
     * @returns 
     */
    public static getStartListenerMap(listener: string) {
        return this.startListenerMap.get(listener)
    }
    /**
     * 设置End状态监听器
     * @param listener 
     * @param clazz 
     */
    public static setEndListenerMap(listener: string, clazz: any) {
        this.endListenerMap.set(listener, clazz);
    }
    /**
     * 获得End状态监听器
     * @param listener 
     * @returns 
     */
    public static getEndListenerMap(listener: string) {
        return this.endListenerMap.get(listener)
    }
    /**
     * 设置Take状态监听器
     * @param listener 
     * @param clazz 
     */
    public static setTakeListenerMap(listener: string, clazz: any) {
        this.takeListenerMap.set(listener, clazz);
    }
    /**
     * 获得take状态监听器
     * @param listener 
     * @returns 
     */
    public static getTakeListenerMap(listener: string) {
        return this.takeListenerMap.get(listener);
    }
} 