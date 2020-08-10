const Controller = require('../core/Controller');
const StatusReportService = require('../services/StatusReportService');
const AuthService = require('../services/AuthService');

module.exports = class StatusReport extends Controller {
  index() {
    this.ctx.body = 'this is status report';
  }

  async getReports() {
    try {
      this.ctx.body = await StatusReportService.getStatusReport(AuthService.getJobId());
    } catch (e) {
      this.ctx.body = e;
    }
  }
}
