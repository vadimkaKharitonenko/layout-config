import {CartModel} from '../src/components/cart/model';

const products = [
  {
    id: 0,
    name: 'Phone',
    price: 15000,
  },
  {
    id: 1,
    name: 'TV',
    price: 32000
  },
  {
    id: 2,
    name: 'Tea',
    price: 300
  }
];

test('Cart model: total', () => {
  const model = new CartModel({products});

  expect(model.total).toBe(47300);
  expect(model.calculateTotal(products)).toBe(47300);
});

test('Cart model: calculate total', () => {
  const model = new CartModel({products});

  expect(model.calculateTotal(products)).toBe(47300);
});

test('Cart model: remove product', () => {
  const model = new CartModel({products});

  model.removeProduct(0);

  expect(model.products).toMatchObject([{
    id: 1,
    name: 'TV',
    price: 32000
  },
  {
    id: 2,
    name: 'Tea',
    price: 300
  }]);
});