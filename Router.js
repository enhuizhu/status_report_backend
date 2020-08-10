const router = require('koa-router')();

module.exports= class Router {
	constructor(app) {
		this.controllers = {};
		this.app = app;
		this.setRoutes();
	}

	async response(obj, ctx, params = []) {
    if( typeof this.controllers[ obj.controller ] == 'undefined' ) {
			var controller = require('./controllers/' + obj.controller);	
			this.controllers[obj.controller] = new controller();
		}

    this.controllers[obj.controller].setCtx(ctx);
		// this.controllers[obj.controller].setNext(next);
		await this.controllers[obj.controller][obj.action](...params);
	}

	async setRoutes() {
    router
      .get('/',  (ctx) => {
        this.response({
          controller: 'StatusReport',
          action: 'index'
        }, ctx);
      })
      .get('/reports', async (ctx, next) => {
        await this.response({
          controller: 'StatusReport',
          action: 'getReports'
        }, ctx);

        // return await next();
      });
    
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
	}
}