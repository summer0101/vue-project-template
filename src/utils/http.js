/**
 * npm包信息 必须
 * @param {String} name @kmf/axios
 * @param {String} description axios的二次封装
 * @param {String} author 于海航<yuhaihang2@100tal.com>
 * @param {String} keywords kmf,we,axios,http
 * @param {String} contributors 于海航<yuhaihang2@100tal.com>
 */
import axios from "axios"
import VueCookie from "vue-cookie"
import { loadProgressBar } from "axios-progress-bar"

// 进入页面,对url进行编码，防止浏览器拦截hash地址。
let originUrl = encodeURIComponent(window.location.href)

class HttpByAxios {
  constructor() {}
  create(opt) {
    let _this = this
    var defauts = {
      loadProgressBar: false,
      headers: {},
      createOptions: {}
    }
    this.options = Object.assign(defauts, opt)

    let axiosInstance = axios.create(_this.options.createOptions)
    if (this.options.loadProgressBar) {
      loadProgressBar({}, axiosInstance)
    }
    if (VueCookie.get("authkey")) {
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + VueCookie.get("authkey")
      axiosInstance.defaults.headers.common["K-Product-Line"] = "web"
    }
    //http request 拦截器
    axiosInstance.interceptors.request.use(
      config => {
        for (let i in this.options.headers) {
          config.headers[i] = this.options.headers[i]
        }
        return config
      },
      error => {
        return Promise.reject(err)
      }
    )
    //响应拦截器即异常处理
    axiosInstance.interceptors.response.use(
      response => {
        const res = response.data // 响应成功后已经获取 res.data 这里需要注意下
        return Promise.resolve(res)
      },
      err => {
        let errMsg = {
          status: "",
          msg: ""
        }
        if (err && err.response) {
          errMsg.status = err.response.status
          switch (err.response.status) {
            case 400:
              errMsg.msg = "错误请求"
              break
            case 401:
              errMsg.msg = "未授权，请重新登录"
              localStorage.removeItem("userInfo") //  无权限 移除用户信息，代表认证过期或者未登录
              let url = ""
              if (!_this.options.redirect401Url) {
                // 处理登录失败，跳转到登录页
                let defaultUrl =
                  window.location.host.indexOf("test") !== -1 ? "test-" : ""
                url = `//${defaultUrl}account.kmf.com/login?backurl=${originUrl}`
              } else {
                url = _this.options.redirect401Url
              }
              setTimeout(() => {
                window.location.replace(url, "_blank")
              }, 5000)
              break
            case 403:
              errMsg.msg = "拒绝访问"
              break
            case 404:
              errMsg.msg = "请求错误,未找到该资源"
              break
            case 405:
              errMsg.msg = "请求方法未允许"
              break
            case 408:
              errMsg.msg = "请求超时"
              break
            case 500:
              errMsg.msg = "服务器端出错"
              break
            case 501:
              errMsg.msg = "网络未实现"
              break
            case 502:
              errMsg.msg = "网络错误"
              break
            case 503:
              errMsg.msg = "服务不可用"
              break
            case 504:
              errMsg.msg = "网络超时"
              break
            case 505:
              errMsg.msg = "http版本不支持该请求"
              break
            default:
              errMsg.msg = `连接错误${err.response.status}`
          }
        } else {
          errMsg.msg = "连接到服务器失败"
        }
        _this.options.errCallback && _this.options.errCallback(errMsg)
        return Promise.resolve(err.response)
      }
    )
    return axiosInstance
  }
}

const httpByAxios = new HttpByAxios()

export default httpByAxios
