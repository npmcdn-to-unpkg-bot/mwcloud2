import { BaseModel } from './base.model';
import { MemberModel } from './member.model';
import { OrderType,OrderSource,OrderStatus } from '../enums/order.enum';


export class OrderModel extends BaseModel {
    order_no: string;
    original_money:number;
    receivable_money:number;
    real_receivable_money:number;
    repair:boolean;
    remark:string;
    order_date:string;
    pay_date: string;
    source:OrderSource;
    status:OrderStatus;
    order_type:OrderType;
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
    // constructor(id: number, order_no: string, pay_date: string, member_id?: number, member_no?: string, member_name?: string, member_mobile?: string) {
    //     super(id);
    //     this.order_no = order_no;
    //     this.pay_date = pay_date;
    //     if (member_id) {
    //         this.member = new MemberModel(member_id, member_no, member_name, member_mobile);
    //     }else{
    //         this.member = new MemberModel(0);
    //     }
    // }
    constructor(id?: number){
        super(id);
    }

    static serializer(model:any):OrderModel{
        if(!model){
            return null;
        }
        // let order_model = new OrderModel(
        //     model.id,
        //     model.orderNo,
        //     model.payDate,
        //     model.memberId,
        //     model.memberNo,
        //     model.memberName,
        //     model.memberMobile
        // );
        let order_model : OrderModel = new OrderModel();
        order_model.id = model.id;
        order_model.original_money = model.originalMoney;
        order_model.receivable_money = model.receivableMoney;
        order_model.real_receivable_money = model.realReceivableMoney;
        order_model.order_no = model.orderNo;
        order_model.pay_date = model.payDate;
        order_model.order_date = model.orderDate;
        order_model.source = +model.source;
        order_model.status = +model.status;
        order_model.order_type = +model.orderKind;
        order_model.member = MemberModel.serializer(model.simpleMemberVo,model.memberId);
        return order_model;
    } 

}
