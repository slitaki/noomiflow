import { BaseEntity } from 'relaen';
import { NfProcess } from './nfprocess';
export declare class NfDefProcess extends BaseEntity {
    processDefId: number;
    defName: string;
    kEYWORDS: string;
    defType: string;
    createTime: number;
    updTime: number;
    cfgStr: string;
    dueTime: number;
    ver: number;
    nfProcesss: Array<NfProcess>;
    constructor(idValue?: number);
    getNfProcesss(): Promise<Array<NfProcess>>;
}
