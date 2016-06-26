import { OrderModel } from '@mw/core/models/order.model';
describe('test tests', () => {
    it('true is true',
        () => expect(true).toEqual(true)
    );
    it('null is not the same thing as undefined',
        () => expect(null).not.toEqual(undefined)
    );
    it('null is the same thing as undefined',
        () => expect(null).toEqual(undefined)
    );
    it('0.1+0.2=0.3 ?',
        () => expect(0.1 + 0.2).toEqual(0.3)
    );
});

describe('order model test', () => {
    it('order.id==1 ?', () => {
        let order: OrderModel = { id: 1, name: "order_name" };
        expect(order.id).toEqual(1);
    });
});
