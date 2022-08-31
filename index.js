const CloudApi = require('qcloudapi-sdk');
const axios = require('axios');
const dayjs = require('dayjs');

const capi = new CloudApi({
  SecretId: "", // 在腾讯云控制台生成
  SecretKey: "",  // 在腾讯云控制台生成
  serviceType: "cns"
});

async function getIp() {
  try {
    const { data } = await axios.get('http://ip.gs/json');
    return data.ip
  } catch (err) {
    return Promise.reject();
  }
}

async function call(params, options = {}) {
  return new Promise((resolve, reject) => {
    capi.request(params, options, (err, res = {}) => {
      if (err) {
        return reject(err);
      }

      console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), JSON.stringify({ params, res }))
      const { code = -1 } = res;
      if (code === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
}

async function run() {
    try {
      const ip = await getIp();
      const params = {
        Action: 'RecordModify',
        domain: 'imcolin.fan',
        recordId: 812162195,
        value: ip,
        subDomain: 'nas',
        recordType: 'A',
        recordLine: '默认'
      };
      const res = await call(params);
      console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), res);
      return params;
    } catch (err) {
      console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'), err);
      return err;
    }
}

run();