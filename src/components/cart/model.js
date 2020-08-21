import {EventEmitter} from '../../helpers/event-emitter';

class CartModel extends EventEmitter {
  constructor({products}) {
    super();

    this._products = products;
    this._total = this.calculateTotal(products);
  }

  removeProduct(id) {
    this._products = this._products.filter((product) => product.id !== id);
    this._total = this.calculateTotal(this._products);
    this.emit('updated', {products: this._products, total: this._total});
  }

  calculateTotal(products) {
    return products.reduce((acc, product) => acc + Number(product.price), 0);
  }

  get products() {
    return this._products;
  }

  get total() {
    return this._total;
  }
}

export {
  CartModel
};
