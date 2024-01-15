export class Tools {

    static parseCfgStr(cfgStr: string) {
        let cfg;
        try {
            cfg = JSON.parse(cfgStr);
            return cfg;
        } catch (e) {
            throw "流程定义错误!";
        }
    }

}