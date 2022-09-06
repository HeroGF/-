// 所有的postcss的插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      // 根节点字体大小
      // 如果是vant 37.5 如果自己的代码 75
      // file当前编译的css的文件路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有的属性都转成rem
    })
  ]
}
