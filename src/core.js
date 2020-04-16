import {afterEachFn, beforeEachFn, onErrorFn, routerStatus} from "./storage"
import url from "url"

// 内部防抖开关
let waitJumpSucc = false

/**
 * 注销绑定的函数
 * @param fnList 函数队列
 * @param fn 要注销的函数指针
 */
export function removeFn (fnList, fn) {
    const fnIndex = fnList.indexOf(fn)
    fnList.splice(fnIndex,1)
}

/**
 * 运行带有拦截功能的函数队列，支持async拦截
 * @param fnList 函数队列
 * @param to
 * @param from
 * @returns {Promise<boolean>}
 */
export async function callWithNext (fnList, to, from) {
    let stop = true
    function next () {
        routerStatus.afterNotNext = null // 重置afterNotNext
        stop = false
    }
    for (let fn of fnList) {
        await fn(to, from, next)
        if (stop) {
            return false
        }
        stop = true
    }
    return true
}

/**
 * 运行没有拦截功能的函数队列
 * @param fnList
 * @param to
 * @param from
 */
export function callWithoutNext (fnList, to, from) {
    fnList.forEach((fn) => {
        fn(to, from)
    })
}

/**
 * 获取路由参数
 * @param paramsName {String} 路由参数对象类型
 * @returns {*}
 */
export function getParams (paramsName) {
    const params = routerStatus[paramsName]
    routerStatus[paramsName] = null
    return params
}

/**
 * 高阶函数，抽取路由参数
 * @param payload {Object} 路由动作的参数
 * @param paramsName {String} 路由参数对象类型
 * @returns {*}
 */
function extractParams (payload, paramsName) {
    if (typeof payload[paramsName] === 'object') {
        routerStatus[paramsName] = {
            ...payload[paramsName]
        }
    }
    return payload
}

/**
 * 运行afterNotNext函数
 */
function callAfterNotNext () {
    const afterNotNext = routerStatus.afterNotNext
    routerStatus.afterNotNext = null
    if (typeof afterNotNext === 'function'){
        afterNotNext()
    }
}

/**
 * 获取async返回类型的路由动作结果
 * @param result
 * @param to
 * @param from
 * @returns {Promise<*>}
 */
async function getAsyncResult (result, to, from) {
    try {
        let newResult = await result
        if (newResult.length === 1) {
            // 失败时重置防抖
            routerStatus.allowAction = true
            callWithoutNext(onErrorFn, to, from)
        }
        return newResult
    } catch(e) {
        return new Error(e)
    }
}

/**
 * 原生路由动作的公共劫持方法
 * @param nativeFun {Function} 原生方法
 * @param payload {Object} 参数
 * @param jumpType {String} 原生方法名
 * @returns {*}
 */
export function intercept (nativeFun, payload, jumpType) {
    // 判断是否能获取到页面栈
    try {
        getNowUrl()
    } catch(e) {
        return nativeFun.call(uni, payload)
    }

    let {fail, success, complete} = payload
    // 防抖
    if (!routerStatus.allowAction) {
        let errMsg = '动作被拦截，因为已经有一个正在执行的路由动作'
        if (!(fail || success || complete)) {
            return [{errMsg}]
        }
        return payload.fail && payload.fail({errMsg})
    }
    routerStatus.allowAction = false
    waitJumpSucc = false
    let currentUrl = getNowUrl()
    let toUrl;

    if (jumpType === 'navigateBack') {
        let {delta = 1} = payload
        let targetIndex = getCurrentPages().length - 1 - delta
        if (targetIndex < 0) {
            targetIndex = 0
        }
        toUrl = getCurrentPages()[targetIndex].route
    } else {
        // 去除根斜杠
        toUrl = url.resolve(currentUrl,payload.url).replace(/^\/([^\/])/,'$1').replace(/([^?]+)\?[\s\S]*/,'$1')
    }

    let to = {
        url: toUrl,
        routeParams: payload.routeParams,
        passedParams: payload.passedParams,
        jumpType
    }
    // 代表回调类型，返回undefined
    if (fail || success || complete) {
        payload.fail = (...params) => {
            // 失败时重置防抖
            routerStatus.allowAction = true
            callWithoutNext(onErrorFn, to, routerStatus.current)
            if (fail) {
                return fail.apply(this, params)
            }
        }

        // 自执行一个async函数
        (async function () {
            if (!await callWithNext(beforeEachFn, to, routerStatus.current)) {
                payload.fail({
                    errMsg: 'beforeEach中没有使用next'
                })
                callAfterNotNext()
                return
            }
            waitJumpSucc = true
            nativeFun.call(uni, extractParams(extractParams(payload, 'routeParams'), 'passedParams'))
        })()
        return
    }

    // 返回async
    return (async function () {
        if (!await callWithNext(beforeEachFn, to, routerStatus.current)) {
            // 失败时重置防抖
            routerStatus.allowAction = true
            callAfterNotNext()
            return [{
                errMsg:'beforeEach中没有使用next'
            }]
        }
        waitJumpSucc = true
        const result = nativeFun.call(uni, extractParams(extractParams(payload, 'routeParams'), 'passedParams'))
        return getAsyncResult (result, to, routerStatus.current)
    })()
}

/**
 * 获取当前的路由地址
 * @returns {(() => void) | string}
 */
function getNowUrl () {
    const pages = getCurrentPages()
    return pages[pages.length-1].route
}

/**
 * 获取当前的page对象
 * @returns {wx.Page | tinyapp.IPageInstance<any> | WechatMiniprogram.Page.Instance<IAnyObject, IAnyObject>}
 */
function getNowPage () {
    const pages = getCurrentPages()
    return pages[pages.length-1]
}

/**
 * 获取当前的路由原信息
 * @returns {{url: *, routeParams: (*|routerStatus.routerParams|{})}}
 */
function getNowRoute () {
    let nowPage = getNowPage()
    return {
        url: getNowUrl(),
        routeParams: nowPage.$routeParams,
        passedParams: nowPage.$passedParams
    }
}

/**
 * 监听防抖
 */
function watchAllowAction () {
    if (waitJumpSucc) {
        // 成功时重置防抖
        routerStatus.allowAction = true
    }
    waitJumpSucc = false
}

/**
 * 对路由进行包囊的公共方法
 * @param nativeFunName
 */
function wrapNativeFun (nativeFunName) {
    const nativeFun = uni[nativeFunName]
    uni[nativeFunName] = (payload) => {
        return intercept(nativeFun, payload, nativeFunName)
    }
}

/**
 * 启动函数，用于在Vue plugin中的install方法中执行
 * @param Vue
 * @param options
 */
export function bootstrap (Vue, options) {
    Vue.mixin({
        onLoad(){
            watchAllowAction()
            getNowPage().$routeParams = this.$routeParams = getParams('routeParams')
        },
        onShow () {
            // 判断是否能获取到页面栈
            try {
                getNowUrl()
            } catch(e) {
                return
            }

            watchAllowAction()

            getNowPage().$passedParams = this.$passedParams = getParams('passedParams')
            // 执行afterEach
            callWithoutNext(afterEachFn, getNowRoute(), routerStatus.current)
            routerStatus.current = getNowRoute()
        }
    })

    // 包装uni的原生方法
    wrapNativeFun('navigateTo')
    wrapNativeFun('redirectTo')
    wrapNativeFun('reLaunch')
    wrapNativeFun('switchTab')
    wrapNativeFun('navigateBack')
}
