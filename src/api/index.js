/**
 * 统一api处理
 * 遍历业务线api
 * api内为公用api
 */

import axiosExtensionsServer from 'axios-extensions-server';

let http = axiosExtensionsServer.create({
    loadProgressBar: false,
    headers: {},
    createOptions: {},
    errCallback(err){
        console.log(err.status)
        console.log(err.msg)
    }
})
let api = {
    getInfoBase: process.env.VUE_APP_API_PREFIX + '/api-passport/user/info/base',
};

const apiContext = require.context('../views', true, /_api\.js$/);
apiContext.keys().forEach(apictx => {
    const apiModule = apiContext(apictx);
    /**
    * 兼容 import export 和 require module.export 两种规范
    */
    api = { ...api, ...(apiModule.default || apiModule) }
})
export default api;
