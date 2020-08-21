import {EventEmitter} from '../../helpers/event-emitter';

class CartController extends EventEmitter {
  constructor(model, view) {
    super();

    this._model = model;
    this._view = view;

    this._view.on('delete-product', ({id}) => this._model.removeProduct(Number(id)));
    this._model.on('updated', data => this._view.render(data));
  }
}

export {
  CartController
};
