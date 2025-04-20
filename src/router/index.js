import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import User from '../views/User.vue'
import Setting from '../views/Setting.vue'
import Document from '../views/Document.vue'
import Analysis from '../views/Analysis.vue'
import Logs from '../views/Logs.vue'
import Permission from '../views/Permission.vue'
import ManuManager from '../views/manager/ManuManager.vue'
import CategoryManager from '../views/manager/CategoryManager.vue'

const routes = [
  {
    path: '/manager/menuManager',
    name: 'MenuManager',
    component: ManuManager,
    meta: { title: '菜品管理' }
  },
  {
    path: '/manager/categoryManager',
    name: 'CategoryManager',
    component: CategoryManager,
    meta: { title: '菜品类别管理' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: '工作台' }
  },
  
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { title: '用户管理' }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { title: '系统设置' }
  },
  {
    path: '/document',
    name: 'Document',
    component: Document,
    meta: { title: '文档管理' }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis,
    meta: { title: '数据分析' }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: { title: '日志管理' }
  },
  {
    path: '/permission',
    name: 'Permission',
    component: Permission,
    meta: { title: '权限管理' }
  },
  {
    path: '/',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
