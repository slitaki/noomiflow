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
exports.NfNode = void 0;
const relaen_1 = require("relaen");
const nfprocess_1 = require("./nfprocess");
let NfNode = class NfNode extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.nodeId = idValue;
    }
    async getNfProcess() {
        return this['nfProcess'] ? this['nfProcess'] : await relaen_1.EntityProxy.get(this, 'nfProcess');
    }
    async getNfResources() {
        return this['nfResources'] ? this['nfResources'] : await relaen_1.EntityProxy.get(this, 'nfResources');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'NODE_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "nodeId", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfProcess' }),
    relaen_1.JoinColumn({
        name: 'PROCESS_ID',
        refName: 'PROCESS_ID',
        nullable: true
    }),
    __metadata("design:type", nfprocess_1.NfProcess)
], NfNode.prototype, "nfProcess", void 0);
__decorate([
    relaen_1.Column({
        name: 'NODE_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfNode.prototype, "nodeName", void 0);
__decorate([
    relaen_1.Column({
        name: 'DEF_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfNode.prototype, "defName", void 0);
__decorate([
    relaen_1.Column({
        name: 'START_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "startTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'END_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "endTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'WAIT_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "waitTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'VARIABLES',
        type: 'string',
        nullable: true
    }),
    __metadata("design:type", String)
], NfNode.prototype, "variables", void 0);
__decorate([
    relaen_1.Column({
        name: 'ASSIGNEE',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "assignee", void 0);
__decorate([
    relaen_1.Column({
        name: 'USER_ID',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "userId", void 0);
__decorate([
    relaen_1.Column({
        name: 'CANDIDATE_USERS',
        type: 'string',
        nullable: true,
        length: 2048
    }),
    __metadata("design:type", String)
], NfNode.prototype, "candidateUsers", void 0);
__decorate([
    relaen_1.Column({
        name: 'CANDIDATE_GROUPS',
        type: 'string',
        nullable: true,
        length: 2048
    }),
    __metadata("design:type", String)
], NfNode.prototype, "candidateGroups", void 0);
__decorate([
    relaen_1.Column({
        name: 'IS_AGREE',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "isAgree", void 0);
__decorate([
    relaen_1.Column({
        name: 'REASON',
        type: 'string',
        nullable: true,
        length: 1024
    }),
    __metadata("design:type", String)
], NfNode.prototype, "reason", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfNode.prototype, "ver", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfResource',
        mappedBy: 'nfNode'
    }),
    __metadata("design:type", Array)
], NfNode.prototype, "nfResources", void 0);
NfNode = __decorate([
    relaen_1.Entity('NF_NODE'),
    __metadata("design:paramtypes", [Number])
], NfNode);
exports.NfNode = NfNode;
//# sourceMappingURL=nfnode.js.map