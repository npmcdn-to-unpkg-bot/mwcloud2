export enum OrderType{
    ALL = 1,//综合消费
    CARD = 2,//购卡/开卡
    RECHARGE = 3 //卡充值/钱包充值
}

export enum OrderSource{
    MEIWEN = 14//美问
}

export enum OrderStatus{
    UNPAID = 11,//待支付
    PAID = 20,//已支付
 	PAID_LEFT = 40,//尾款
 	HISTORY = 41//历史订单
}