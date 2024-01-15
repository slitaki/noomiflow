import { NfHiNodeInst } from "./entity/nfhinodeinst";

export class NfHisTask {
    public static async getHisTask(userId) {
        let res = await NfHiNodeInst.findMany({
            assignee: userId,
            rel: "="
        })
        return res.length;
    }
}