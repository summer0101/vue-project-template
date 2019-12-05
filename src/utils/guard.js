/**
 * 导航守卫
 */
import VueCookie from 'vue-cookie'

export default ((to, from, next) =>{
    // 设置html title
    document.title = to.meta.title;
    // 获取cookie
    let authkey = VueCookie.get('authkey');
    // 进入页面,对url进行编码，防止浏览器拦截hash地址。
    let originUrl = encodeURIComponent(window.location.href);
    // 是否需要权限认证：前端路由判断，需要&&无authkey 直接跳转登录。
    if (to.meta.requiresAuth){
        // 需要权限认证，但是没有cookie authkey 
        if (!authkey){
            // 直接跳转登录，无需走到 axios拦截器
            window.location.replace(process.env.VUE_APP_PRFIEX + 'account.kmf.com/login?backurl=' + originUrl, '_blank');

        }else{
            // ********* 现在统一走 axios拦截器处理401 如果需要用户信息，在入口处进行获取，不要再导航守卫中获取了。
            next();
            // ************** 以前每次都进行校验
            //  校验authkey是否有效
            // axios.get(process.env.VUE_APP_API_PREFIX + '/api-passport/user/info/base').then(res => {

            //     if (res.status == 200 || res.status == 1){
            //         // 判断如果是新用户，需要跳转到补全信息流程
            //         if(res.result.new_user == 1){

            //             window.location.replace(process.env.VUE_APP_PRFIEX + 'account.kmf.com/register/completereg');

            //         }else{
            //             // 老用户，存入用户信息
            //             localStorage.setItem('userInfo', JSON.stringify(res.result));
            //         }
            //         next();
            //     }
            // })

        }
    }else{
        next();
    }
    


})