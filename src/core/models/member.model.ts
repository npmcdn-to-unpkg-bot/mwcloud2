import { BaseModel } from './base.model';
import { GenderType } from '../enums/mw.enum';

export class MemberModel extends BaseModel {
    member_no: string;
    name: string;
    mobile: string;
    gender:GenderType;
    avatar_id:number;
    avatar_path:string;
    //constructor(id: number);
    constructor(id?: number, member_no?: string, name?: string, mobile?: string) {
        super(id);
        if (id) {
            this.member_no = member_no;
            this.name = name;
            this.mobile = mobile;
        }else{
        	this.member_no = "0";
            this.name = "散客";
            this.mobile = "";
        }
    }

    static serializer(model:any,member_id:number):MemberModel{
        if(!model){
            return null;
        }
        let member_model : MemberModel = new MemberModel();
        if(model.id || member_id){
        	member_model.id = model.id?model.id:member_id;
        	member_model.avatar_id = model.avatarId;
            member_model.avatar_path = "http://newtest.mei1.com/api/file/"+model.avatarId;
        	member_model.member_no = model.memberNo;
        	member_model.name = model.name;
        	member_model.mobile = model.mobile;
            member_model.gender = +model.gender;
        }else{
        	//散客
        	member_model.id = 0;
        	member_model.name = "散客";
        }
        if(!member_model.avatar_id){
            member_model.avatar_path = "assets/images/default_female.png";
        }
        if(!member_model.gender){
            member_model.gender = GenderType.female;
        }
        
        return member_model;
    }
}
