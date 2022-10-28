import { BaseEntity } from 'relaen';
import { NfNode } from './nfnode';
export declare class NfResource extends BaseEntity {
    resourceId: number;
    nfNode: NfNode;
    resourceName: string;
    resourceByte: string;
    ver: number;
    constructor(idValue?: number);
    getNfNode(): Promise<NfNode>;
}
