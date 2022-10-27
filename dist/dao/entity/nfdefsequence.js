"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NfDefSequence = void 0;
const relaen_1 = require("relaen");
const nfdefnode_1 = require("./nfdefnode");
let NfDefSequence = class NfDefSequence extends relaen_1.BaseEntity {
    constructor(nfDefNode) {
        super();
        this.nfDefNode = nfDefNode;
    }
    async getNfDefNode() {
        return this['nfDefNode'] ? this['nfDefNode'] : await relaen_1.EntityProxy.get(this, 'nfDefNode');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.OneToOne({ entity: 'NfDefNode' }),
    relaen_1.JoinColumn({
        name: 'DEF_NODE_ID',
        refName: 'DEF_NODE_ID',
        nullable: true
    }),
    __metadata("design:type", nfdefnode_1.NfDefNode)
], NfDefSequence.prototype, "nfDefNode", void 0);
__decorate([
    relaen_1.Column({
        name: 'SOURCEREF',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfDefSequence.prototype, "sOURCEREF", void 0);
__decorate([
    relaen_1.Column({
        name: 'TARGETREF',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfDefSequence.prototype, "tARGETREF", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefSequence.prototype, "vER", void 0);
__decorate([
    relaen_1.Column({
        name: 'CONDITIONS',
        type: 'string',
        nullable: true,
        length: 1024
    }),
    __metadata("design:type", String)
], NfDefSequence.prototype, "cONDITIONS", void 0);
NfDefSequence = __decorate([
    relaen_1.Entity('NF_DEF_SEQUENCE'),
    __metadata("design:paramtypes", [nfdefnode_1.NfDefNode])
], NfDefSequence);
exports.NfDefSequence = NfDefSequence;
//# sourceMappingURL=nfdefsequence.js.map