module.exports = class Controller {
  setCtx(ctx) {
    this.ctx = ctx;
  }

  setNext(next) {
    this.next = next;
  }
}
