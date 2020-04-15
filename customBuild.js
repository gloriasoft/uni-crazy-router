const fs = require('fs-extra')
const path = require('path')
const filePath = path.resolve(__dirname,'dist/uni_crazy_router.umd.js')
const injectCode='let regeneratorRuntime = require("regenerator-runtime");'
fs.writeFileSync(filePath,injectCode + fs.readFileSync(filePath,'utf8'))
