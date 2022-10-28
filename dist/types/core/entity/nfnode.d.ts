import { BaseEntity } from 'relaen';
import { NfProcess } from './nfprocess';
import { NfResource } from './nfresource';
export declare class NfNode extends BaseEntity {
    nodeId: number;
    nfProcess: NfProcess;
    nodeName: string;
    defId: string;
    startTime: number;
    endTime: number;
    waitTime: number;
    variables: string;
    assignee: number;
    userId: number;
    candidateUsers: string;
    candidateGroups: string;
    isAgree: number;
    reason: string;
    ver: number;
    nfResources: Array<NfResource>;
    constructor(idValue?: number);
    getNfProcess(): Promise<NfProcess>;
    getNfResources(): Promise<Array<NfResource>>;
}
