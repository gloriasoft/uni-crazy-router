const fs = require('fs-extra')
const path = require('path')
const env = process.env.BUILD_ENV || 'index'
const filePath = path.resolve(__dirname,'dist/' + env+ '.js')
// 小程序对regeneratorRuntime的bug处理
const injectCode='import regeneratorRuntime from "regenerator-runtime";'
fs.writeFileSync(filePath, injectCode + fs.readFileSync(filePath, 'utf8'))
