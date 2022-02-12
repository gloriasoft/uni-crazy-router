const path = require('path');
const fs = require('fs');

/**
 * 对于H5 production环境做特殊处理
 * 必须在main.js中字面量写入
 * 让vite打包时在uni对象里强制标记5个方法，否则vite会用内部函数指针把代码中的字面量全部覆盖
 * 必须字面量描述，不能动态描述
 * 使用方式，在uni vite项目的main.js直接引入，否则h5 production环境下需要项目本身自己处理字面量
 */
module.exports = function () {
    return {
        load(id, options) {
            if (!(process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'production')) return
            if (id.replace(/\\/g, '/') === path.resolve(process.env.UNI_INPUT_DIR, 'main.js').replace(/\\/g, '/')) {
                const code = fs.readFileSync(id).toString()
                return `const navigateTo = uni.navigateTo
const redirectTo = uni.redirectTo
const reLaunch = uni.reLaunch
const switchTab = uni.switchTab
const navigateBack = uni.navigateBack
uni.navigateTo = navigateTo
uni.redirectTo = redirectTo
uni.reLaunch = reLaunch
uni.switchTab = switchTab
uni.navigateBack = navigateBack
;
${code}`
            }
        }
    }
}
