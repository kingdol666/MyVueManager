import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIcons from '@element-plus/icons-vue'

import axios from '../../MyOrderManager/MyOrderManager/utils/axios'

const app = createApp(App)

// 全局挂载axios
app.config.globalProperties.$axios = axios

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.mount('#app')
