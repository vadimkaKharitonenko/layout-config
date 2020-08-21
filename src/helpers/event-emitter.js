class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(evt, lsn) {
    (this._events[evt] || (this._events[evt] = [])).push(lsn);
  }

  emit(evt, arg) {
    (this._events[evt] || []).forEach(lsn => lsn(arg));
  }
}

export {
  EventEmitter
};
