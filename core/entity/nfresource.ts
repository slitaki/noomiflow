import { BaseEntity, Entity, Column, Id, JoinColumn, ManyToOne, EntityProxy } from 'relaen';
import { NfNode } from './nfnode';

@Entity('nf_resource')
export class NfResource extends BaseEntity {
	@Id()
	@Column({
		name: 'RESOURCE_ID',
		type: 'int',
		nullable: false
	})
	public resourceId: number;

	@Column({
		name: 'RESOURCE_NAME',
		type: 'string',
		nullable: true,
		length: 256
	})
	public resourceName: string;

	@Column({
		name: 'RESOURCE_BYTE',
		type: 'string',
		nullable: true
	})
	public resourceByte: string;

	@Column({
		name: 'VER',
		type: 'int',
		nullable: true
	})
	public ver: number;

	@Column({
		name: 'FILE_PATH',
		type: 'string',
		nullable: true,
		length: 255
	})
	public filePath: string;

	@Column({
		name: 'DOWN_PATH',
		type: 'string',
		nullable: true,
		length: 255
	})
	public downPath: string;

	@Column({
		name: 'TYPE',
		type: 'string',
		nullable: true,
		length: 255
	})
	public type: string;

	@Column({
		name: 'CREATE_TIME',
		type: 'int',
		nullable: true
	})
	public createTime: number;

	constructor(idValue?: number) {
		super();
		this.resourceId = idValue;
	}
}