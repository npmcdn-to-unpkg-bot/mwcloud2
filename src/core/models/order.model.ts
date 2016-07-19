import { BaseModel } from './base.model';
import { MemberModel } from './member.model';
import { OrderType,OrderSource,OrderStatus } from '../enums/order.enum';
import { ItemBaseModel } from './item-base.model';
import { ItemFactory } from './item.factory';

export class OrderModel extends BaseModel {
    orderNo: string;
    originalMoney:number;
    receivableMoney:number;
    realReceivableMoney:number;
    repair:boolean;
    remark:string;
    orderDate:string;
    payDate: string;
    source:OrderSource;
    status:OrderStatus;
    orderType:OrderType;
    member: MemberModel;
    itemList:ItemBaseModel[];
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
        let order : OrderModel = new OrderModel(model.id);
        //order_model.id = model.id;
        order.originalMoney = order.point2yuan(model.originalMoney);
        order.receivableMoney = order.point2yuan(model.receivableMoney);
        order.realReceivableMoney = order.point2yuan(model.realReceivableMoney);
        order.orderNo = model.orderNo;
        order.payDate = model.payDate;
        order.orderDate = model.orderDate;
        order.source = +model.source;
        order.status = +model.status;
        order.orderType = +model.orderKind;
        order.member = MemberModel.serializer(model.simpleMemberVo,model.memberId);
        if(model.orderItems && model.orderItems.length > 0){
            order.itemList = [];
            for(let i in model.orderItems){
                order.itemList.push(ItemFactory.serializerItem(model.orderItems[i]));
            }
        }
        return order;
    } 

}
