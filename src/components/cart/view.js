import {EventEmitter} from '../../helpers/event-emitter';

class CartView extends EventEmitter {
  constructor({nodes}) {
    super();

    this._nodes = nodes;
    this.initListeners();
  }

  initListeners() {
    document.addEventListener('click', e => {
      if (!e.target.classList.contains('js-product-delete')) return;
      this.emit('delete-product', {id: e.target.dataset.id});
    });
  }

  render({products, total}) {
    const productsHtml = products.reduce((acc, product) => acc + `
      <article class="product">
        <h2>${product.name}</h2>
        <span>${product.price} $</span>
        <button class="js-product-delete" data-id="${product.id}">Delete</button>
      </article>
    `, '');

    this._nodes.container.innerHTML = productsHtml || 'cart is empty';
    this._nodes.total.textContent = total ? `${total} $` : '';
  }
}

export {
  CartView
};
