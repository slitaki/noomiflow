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
exports.NfProcess = void 0;
const relaen_1 = require("relaen");
const nfdefprocess_1 = require("./nfdefprocess");
let NfProcess = class NfProcess extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.processId = idValue;
    }
    async getNfDefProcess() {
        return this['nfDefProcess'] ? this['nfDefProcess'] : await relaen_1.EntityProxy.get(this, 'nfDefProcess');
    }
    async getNfNodes() {
        return this['nfNodes'] ? this['nfNodes'] : await relaen_1.EntityProxy.get(this, 'nfNodes');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'PROCESS_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "processId", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfDefProcess' }),
    relaen_1.JoinColumn({
        name: 'PROCESS_DEF_ID',
        refName: 'PROCESS_DEF_ID',
        nullable: true
    }),
    __metadata("design:type", nfdefprocess_1.NfDefProcess)
], NfProcess.prototype, "nfDefProcess", void 0);
__decorate([
    relaen_1.Column({
        name: 'PROCESS_NAME',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfProcess.prototype, "processName", void 0);
__decorate([
    relaen_1.Column({
        name: 'USER_ID',
        type: 'number',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "userId", void 0);
__decorate([
    relaen_1.Column({
        name: 'START_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "startTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'END_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "endTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'HANDLE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "handleTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'CREATE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "createTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'DELETE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "deleteTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'DELETE_REASON',
        type: 'string',
        nullable: true,
        length: 2048
    }),
    __metadata("design:type", String)
], NfProcess.prototype, "deleteReason", void 0);
__decorate([
    relaen_1.Column({
        name: 'DUE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "dueTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'NODE_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfProcess.prototype, "nodeName", void 0);
__decorate([
    relaen_1.Column({
        name: 'VARIABLES',
        type: 'string',
        nullable: true,
        length: 4000
    }),
    __metadata("design:type", String)
], NfProcess.prototype, "variables", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfProcess.prototype, "ver", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfNode',
        mappedBy: 'nfProcess'
    }),
    __metadata("design:type", Array)
], NfProcess.prototype, "nfNodes", void 0);
NfProcess = __decorate([
    relaen_1.Entity('NF_PROCESS'),
    __metadata("design:paramtypes", [Number])
], NfProcess);
exports.NfProcess = NfProcess;
//# sourceMappingURL=nfprocess.js.map