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
exports.NfDefNode = void 0;
const relaen_1 = require("relaen");
const nfdefprocess_1 = require("./nfdefprocess");
const nfdefendevent_1 = require("./nfdefendevent");
const nfdefexclusivegateway_1 = require("./nfdefexclusivegateway");
const nfdefinclusivegateway_1 = require("./nfdefinclusivegateway");
const nfdefparallelgateway_1 = require("./nfdefparallelgateway");
const nfdefscripttask_1 = require("./nfdefscripttask");
const nfdefsequence_1 = require("./nfdefsequence");
const nfdefstartevent_1 = require("./nfdefstartevent");
const nfdefusertask_1 = require("./nfdefusertask");
let NfDefNode = class NfDefNode extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.defNodeId = idValue;
    }
    async getNfDefProcess() {
        return this['nfDefProcess'] ? this['nfDefProcess'] : await relaen_1.EntityProxy.get(this, 'nfDefProcess');
    }
    async getNfDefEndevent() {
        return this['nfDefEndevent'] ? this['nfDefEndevent'] : await relaen_1.EntityProxy.get(this, 'nfDefEndevent');
    }
    async getNfDefExclusiveGateway() {
        return this['nfDefExclusiveGateway'] ? this['nfDefExclusiveGateway'] : await relaen_1.EntityProxy.get(this, 'nfDefExclusiveGateway');
    }
    async getNfDefInclusiveGateway() {
        return this['nfDefInclusiveGateway'] ? this['nfDefInclusiveGateway'] : await relaen_1.EntityProxy.get(this, 'nfDefInclusiveGateway');
    }
    async getNfDefParallelGateway() {
        return this['nfDefParallelGateway'] ? this['nfDefParallelGateway'] : await relaen_1.EntityProxy.get(this, 'nfDefParallelGateway');
    }
    async getNfDefProcesss() {
        return this['nfDefProcesss'] ? this['nfDefProcesss'] : await relaen_1.EntityProxy.get(this, 'nfDefProcesss');
    }
    async getNfDefScripttask() {
        return this['nfDefScripttask'] ? this['nfDefScripttask'] : await relaen_1.EntityProxy.get(this, 'nfDefScripttask');
    }
    async getNfDefSequence() {
        return this['nfDefSequence'] ? this['nfDefSequence'] : await relaen_1.EntityProxy.get(this, 'nfDefSequence');
    }
    async getNfDefStartevent() {
        return this['nfDefStartevent'] ? this['nfDefStartevent'] : await relaen_1.EntityProxy.get(this, 'nfDefStartevent');
    }
    async getNfDefUsertask() {
        return this['nfDefUsertask'] ? this['nfDefUsertask'] : await relaen_1.EntityProxy.get(this, 'nfDefUsertask');
    }
    async getNfNodes() {
        return this['nfNodes'] ? this['nfNodes'] : await relaen_1.EntityProxy.get(this, 'nfNodes');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'DEF_NODE_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfDefNode.prototype, "defNodeId", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfDefProcess' }),
    relaen_1.JoinColumn({
        name: 'PROCESS_DEF_ID',
        refName: 'PROCESS_DEF_ID',
        nullable: true
    }),
    __metadata("design:type", nfdefprocess_1.NfDefProcess)
], NfDefNode.prototype, "nfDefProcess", void 0);
__decorate([
    relaen_1.Column({
        name: 'DEFINE_ID',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfDefNode.prototype, "defineId", void 0);
__decorate([
    relaen_1.Column({
        name: 'NODE_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfDefNode.prototype, "nodeName", void 0);
__decorate([
    relaen_1.Column({
        name: 'NODE_TYPE',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfDefNode.prototype, "nodeType", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefNode.prototype, "vER", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefEndevent',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefendevent_1.NfDefEndevent)
], NfDefNode.prototype, "nfDefEndevent", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefExclusiveGateway',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefexclusivegateway_1.NfDefExclusiveGateway)
], NfDefNode.prototype, "nfDefExclusiveGateway", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefInclusiveGateway',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefinclusivegateway_1.NfDefInclusiveGateway)
], NfDefNode.prototype, "nfDefInclusiveGateway", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefParallelGateway',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefparallelgateway_1.NfDefParallelGateway)
], NfDefNode.prototype, "nfDefParallelGateway", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfDefProcess',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", Array)
], NfDefNode.prototype, "nfDefProcesss", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefScripttask',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefscripttask_1.NfDefScripttask)
], NfDefNode.prototype, "nfDefScripttask", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefSequence',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefsequence_1.NfDefSequence)
], NfDefNode.prototype, "nfDefSequence", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefStartevent',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefstartevent_1.NfDefStartevent)
], NfDefNode.prototype, "nfDefStartevent", void 0);
__decorate([
    relaen_1.OneToOne({
        entity: 'NfDefUsertask',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", nfdefusertask_1.NfDefUsertask)
], NfDefNode.prototype, "nfDefUsertask", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfNode',
        mappedBy: 'nfDefNode'
    }),
    __metadata("design:type", Array)
], NfDefNode.prototype, "nfNodes", void 0);
NfDefNode = __decorate([
    relaen_1.Entity('NF_DEF_NODE'),
    __metadata("design:paramtypes", [Number])
], NfDefNode);
exports.NfDefNode = NfDefNode;
//# sourceMappingURL=nfdefnode.js.map