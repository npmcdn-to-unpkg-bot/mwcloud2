import { BaseModel } from './base.model';
import { MemberModel } from './member.model';

export class OrderModel extends BaseModel {
    order_no: string;
    pay_date: string;
    member: MemberModel;
    // constructor(id: number, order_no: string, pay_date: string) {
    //     super(id);
    //     this.order_no = order_no;
    //     this.pay_date = pay_date;
    // }

    // constructor(id: number, order_no: string, pay_date: string,member_id:number,member_no:string,member_name:string,member_mobile:string) {
    //     this(id,order_no,pay_date);
    //     this.member = new MemberModel(member_id,member_no,member_name,member_mobile);
    // }
    //constructor(id: number, order_no: string, pay_date: string);
    constructor(id: number, order_no: string, pay_date: string, member_id?: number, member_no?: string, member_name?: string, member_mobile?: string) {
        super(id);
        this.order_no = order_no;
        this.pay_date = pay_date;
        if (member_id) {
            this.member = new MemberModel(member_id, member_no, member_name, member_mobile);
        }else{
            this.member = new MemberModel(0);
        }
    }

}
