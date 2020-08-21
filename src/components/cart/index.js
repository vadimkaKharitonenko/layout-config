import {CartView} from './view';
import {CartModel} from './model';
import {CartController} from './controller';
import './style.css';

const model = new CartModel({
  products: [
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
  ]
});

const view = new CartView({
  nodes: {
    container: document.querySelector('.js-cart-products'),
    total: document.querySelector('.js-cart-total'),
  }
});

new CartController(model, view);