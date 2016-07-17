import { OrderModel } from '@mw/core/index';
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

});
