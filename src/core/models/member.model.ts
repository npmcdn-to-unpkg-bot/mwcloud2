import { BaseModel } from './base.model'

export class MemberModel extends BaseModel {
    member_no: string;
    name: string;
    mobile: string;
    // public constructor(id: number);
    public constructor(id: number, member_no?: string, name?: string, mobile?: string) {
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
}
