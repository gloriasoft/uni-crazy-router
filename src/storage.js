/**
 * beforeEach的注册函数队列
 * @type {Array}
 */
export const beforeEachFn = []

/**
 * afterEach的注册函数队列
 * @type {Array}
 */
export const afterEachFn = []

/**
 * onError的注册函数队列
 * @type {Array}
 */
export const onErrorFn = []

/**
 * 路由状态集合
 * @type {{allowAction: boolean, routerParams: {}, current: {}, afterNotNext: null}}
 */
export const routerStatus = {
    // 外部防抖开关
    allowAction: true,
    // 路由参数对象
    routerParams: null,
    // 动作传递的参数对象
    passedParams: null,
    // 当前路由对象
    current: {},
    // 当前需要处理的afterNotNext
    afterNotNext: null
}
