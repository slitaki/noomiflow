import { BaseEntity, Entity, Column, Id } from 'relaen';

@Entity('nf_hi_proc_inst')
export class NfHiProcInst extends BaseEntity {
	@Id()
	@Column({
		name: 'ID',
		type: 'int',
		nullable: false
	})
	public id: number;

	@Column({
		name: 'PROCESS_ID',
		type: 'int',
		nullable: true
	})
	public processId: number;

	@Column({
		name: 'PROC_DEF_ID',
		type: 'int',
		nullable: true
	})
	public procDefId: number;

	@Column({
		name: 'START_TIME',
		type: 'int',
		nullable: true
	})
	public startTime: number;

	@Column({
		name: 'END_TIME',
		type: 'int',
		nullable: true
	})
	public endTime: number;

	@Column({
		name: 'DURATION',
		type: 'int',
		nullable: true,
		length: 255
	})
	public duration: number;

	@Column({
		name: 'NAME_',
		type: 'string',
		nullable: true,
		length: 255
	})
	public name: string;

	constructor(idValue?: number) {
		super();
		this.id = idValue;
	}
}