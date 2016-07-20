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

    serializer(model:any){
        super.serializer(model.id);
        this.originalMoney = this.point2yuan(model.originalMoney);
        this.receivableMoney = this.point2yuan(model.receivableMoney);
        this.realReceivableMoney = this.point2yuan(model.realReceivableMoney);
        this.orderNo = model.orderNo;
        this.payDate = model.payDate;
        this.orderDate = model.orderDate;
        this.source = +model.source;
        this.status = +model.status;
        this.orderType = +model.orderKind;
        model.simpleMemberVo.id = model.memberId;//???
        this.member = new MemberModel().serializer(model.simpleMemberVo);
        if(model.orderItems && model.orderItems.length > 0){
            this.itemList = [];
            for(let i in model.orderItems){
                this.itemList.push(ItemFactory.serializerItem(model.orderItems[i]));
            }
        }
        return this;
    } 

}
