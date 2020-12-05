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
 * 跳转任务队列，用来存储跳转命令
 * @type {*[]}
 */
export const jumpTaskList = []

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
    afterNotNext: null,
    actionInfo: {
        // navigateBack的目标信息，用来验证是否真正的返回，判断依据是页面栈小于减去delta之后的长度
        navigateBack: null,
        // switchTab的目标信息，用来验证是否真正的切换tab，判断依据是当前route的地址是否和目标地址一致
        switchTab: null
    },
    actionType: null
}
