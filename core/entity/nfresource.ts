import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,EntityProxy} from 'relaen';
import {NfNode} from './nfnode';

@Entity('NF_RESOURCE')
export class NfResource extends BaseEntity{
	@Id()
	@Column({
		name:'RESOURCE_ID',
		type:'int',
		nullable:false
	})
	public resourceId:number;

	@ManyToOne({entity:'NfNode'})
	@JoinColumn({
		name:'NODE_INST_ID',
		refName:'NODE_ID',
		nullable:true
	})
	public nfNode:NfNode;

	@Column({
		name:'RESOURCE_NAME',
		type:'string',
		nullable:true,
		length:256
	})
	public resourceName:string;

	@Column({
		name:'RESOURCE_BYTE',
		type:'string',
		nullable:true
	})
	public resourceByte:string;

	@Column({
		name:'VER',
		type:'int',
		nullable:true
	})
	public ver:number;

	constructor(idValue?:number){
		super();
		this.resourceId = idValue;
	}
	public async getNfNode():Promise<NfNode>{
		return this['nfNode']?this['nfNode']:await EntityProxy.get(this,'nfNode');
	}
}