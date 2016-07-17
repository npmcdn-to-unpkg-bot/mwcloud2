export enum OrderType{
    all = 1,//综合消费
    card = 2,//购卡/开卡
    recharge = 3 //卡充值/钱包充值
}

export enum OrderSource{
    meiwen = 14//美问
}

export enum OrderStatus{
    unpaid = 11,//待支付
    paid = 20,//已支付
 	paidLeft = 40//尾款
}