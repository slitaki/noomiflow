import { BaseEntity } from 'relaen';
import { NfDefProcess } from './nfdefprocess';
import { NfNode } from './nfnode';
export declare class NfProcess extends BaseEntity {
    processId: number;
    nfDefProcess: NfDefProcess;
    processName: string;
    userId: number;
    startTime: number;
    endTime: number;
    handleTime: number;
    createTime: number;
    deleteTime: number;
    deleteReason: string;
    dueTime: number;
    currentId: string;
    variables: string;
    ver: number;
    nfNodes: Array<NfNode>;
    constructor(idValue?: number);
    getNfDefProcess(): Promise<NfDefProcess>;
    getNfNodes(): Promise<Array<NfNode>>;
}
