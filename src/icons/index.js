// 注册自定义svg图标
// 1. 导入所有svg图标
// 2. 完成组件SvgIcon的全局注册

// require.context()创建自己的context，该函数传入三个参数：
// 1. 要搜索的目录
// 2. 标记是否还搜索其子目录
// 3. 匹配文件的正则表达式
// 返回值是一个 require 函数，它接收一个 request 参数，用于导入
// 这个 require 函数通过 require.keys() 获取到所有的svg图标名称
// 把图标名称作为 request 参数传入到 require 导入函数中，完成本地 svg 图标的导入
import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('SvgIcon', SvgIcon)
}
