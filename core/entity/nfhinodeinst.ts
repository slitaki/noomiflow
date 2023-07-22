import {BaseEntity,Entity,Column,Id} from 'relaen';

@Entity('nf_hi_node_inst')
export class NfHiNodeInst extends BaseEntity{
	@Id()
	@Column({
		name:'ID',
		type:'int',
		nullable:false
	})
	public id:number;

	@Column({
		name:'PROCESS_DEF_ID',
		type:'int',
		nullable:true
	})
	public processDefId:number;

	@Column({
		name:'PROCESS_ID',
		type:'int',
		nullable:true
	})
	public processId:number;

	@Column({
		name:'NODE_ID',
		type:'int',
		nullable:true
	})
	public nodeId:number;

	@Column({
		name:'ASSIGNEE',
		type:'string',
		nullable:true,
		length:255
	})
	public assignee:string;

	@Column({
		name:'START_TIME',
		type:'int',
		nullable:true
	})
	public startTime:number;

	@Column({
		name:'END_TIME',
		type:'int',
		nullable:true
	})
	public endTime:number;

	@Column({
		name:'DURATION_TIME',
		type:'int',
		nullable:true
	})
	public durationTime:number;

	@Column({
		name:'NODE_TYPE',
		type:'string',
		nullable:true,
		length:255
	})
	public nodeType:string;

	@Column({
		name:'NODE_NAME',
		type:'string',
		nullable:true,
		length:255
	})
	public nodeName:string;

	@Column({
		name:'DELETE_STATUS',
		type:'int',
		nullable:true
	})
	public deleteStatus:number;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
}