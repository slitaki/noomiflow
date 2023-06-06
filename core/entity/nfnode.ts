import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,OneToMany,EntityProxy} from 'relaen';
import {NfProcess} from './nfprocess';
import {NfResource} from './nfresource';

@Entity('nf_node')
export class NfNode extends BaseEntity{
	@Id()
	@Column({
		name:'NODE_ID',
		type:'int',
		nullable:false
	})
	public nodeId:number;

	@ManyToOne({entity:'NfProcess'})
	@JoinColumn({
		name:'PROCESS_ID',
		refName:'PROCESS_ID',
		nullable:true
	})
	public nfProcess:NfProcess;

	@Column({
		name:'NODE_NAME',
		type:'string',
		nullable:true,
		length:255
	})
	public nodeName:string;

	@Column({
		name:'DEF_ID',
		type:'string',
		nullable:true,
		length:255
	})
	public defId:string;

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
		name:'WAIT_TIME',
		type:'int',
		nullable:true
	})
	public waitTime:number;

	@Column({
		name:'ASSIGNEE',
		type:'string',
		nullable:true,
		length:128
	})
	public assignee:string;

	@Column({
		name:'CANDIDATE_USERS',
		type:'string',
		nullable:true,
		length:128
	})
	public candidateUsers:string;

	@Column({
		name:'CANDIDATE_GROUPS',
		type:'string',
		nullable:true,
		length:128
	})
	public candidateGroups:string;

	@Column({
		name:'VER',
		type:'int',
		nullable:true
	})
	public ver:number;

	@Column({
		name:'VARIABLES',
		type:'string',
		nullable:true,
		length:255
	})
	public variables:string;

	@Column({
		name:'IS_AGREE',
		type:'int',
		nullable:true
	})
	public isAgree:number;

	@Column({
		name:'REASON',
		type:'string',
		nullable:true,
		length:1024
	})
	public reason:string;

	@Column({
		name:'USER_ID',
		type:'int',
		nullable:true
	})
	public userId:number;

	@Column({
		name:'OWNER',
		type:'int',
		nullable:true
	})
	public owner:number;

	@OneToMany({
		entity:'NfResource',
		mappedBy:'nfNode'
	})
	public nfResources:Array<NfResource>;

	constructor(idValue?:number){
		super();
		this.nodeId = idValue;
	}
	public async getNfProcess():Promise<NfProcess>{
		return this['nfProcess']?this['nfProcess']:await EntityProxy.get(this,'nfProcess');
	}
	public async getNfResources():Promise<Array<NfResource>>{
		return this['nfResources']?this['nfResources']:await EntityProxy.get(this,'nfResources');
	}
}