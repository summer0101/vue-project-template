/**
 * 统一api处理
 * 遍历业务线api
 * api内为公用api
 */
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
