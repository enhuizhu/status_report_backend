const axios = require('axios');

module.exports = class AuthService {
  static authorize() {
    axios.post('https://staging-authentication.wallstreetdocs.com/oauth/token', {
      'grant_type': 'client_credentials',
      'client_id': 'coding_test',
      'client_secret': 'bwZm5XC6HTlr3fcdzRnD'
    }).then(r => {
      console.log(r);
      this.tokenInfo = r.data;
      axios.defaults.headers.common['Authorization'] = `${r.data.token_type} ${r.data.access_token}`;
      axios.defaults.headers.common['Accept'] = 'application/json';
      this.setJobId();
    }).catch(console.error);
  }

  static setJobId() {
    return axios.post('https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service')
      .then(r => r.data)
      .then(jobInfo => {
        console.log('job info:', jobInfo);
        this.jobId = jobInfo.job_id;
      });
  }
   
  static getToken() {
    return this.tokenInfo;
  }

  static getJobId() {
    return this.jobId;
  }
}
