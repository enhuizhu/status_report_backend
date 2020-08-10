const Axios = require('axios');

module.exports = class StatusReportService {
  static getStatusReport(jobId) {
    return Axios.get(`https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service/${jobId}`)
      .then(r => r.data);
  }
}