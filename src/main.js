import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 导入全局样式表
import './styles/index.scss'

// 注册全局 SvgIcon 组件
import installSvgIcon from './icons'

// 导入全局路由守卫
import './permission'

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
app.use(store).use(router).mount('#app')
