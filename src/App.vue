<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ElContainer, 
  ElHeader, 
  ElAside, 
  ElMain, 
  ElMenu, 
  ElMenuItem, 
  ElIcon, 
  ElButton,
  ElNotification,
  ElLoading
} from 'element-plus'
import { User, Setting, Document, Fold, Expand, Bell, DataLine, TrendCharts, Monitor, Lock, List } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const isLoading = ref(false)
const notificationCount = ref(3)
const isDarkTheme = ref(false)

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  document.documentElement.setAttribute('data-theme', isDarkTheme.value ? 'dark' : '')
}
 
const router = useRouter()

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
  const sideMenu = document.querySelector('.side-menu')
  if (sideMenu) {
    sideMenu.classList.toggle('collapsed', isCollapse.value)
  }
}

const showNotifications = () => {
  ElNotification({
    title: '通知',
    message: '您有3条未读消息',
    type: 'info',
    position: 'bottom-right'
  })
}

// 页面加载进度处理
watch(() => router.currentRoute.value, (to, from) => {
  isLoading.value = true
  const progressBar = document.querySelector('.progress-bar')
  if (progressBar) {
    progressBar.style.transform = 'scaleX(0.5)'
  }
  
  setTimeout(() => {
    if (progressBar) {
      progressBar.style.transform = 'scaleX(1)'
    }
  }, 100)
  
  setTimeout(() => {
    isLoading.value = false
    if (progressBar) {
      progressBar.style.transform = 'scaleX(0)'
    }
  }, 300)
})
</script>

<template>
  <el-container style="height: 100vh;">
    <el-header class="header">
      <div class="header-content">
        <div class="left-content">
          <el-button 
            :icon="isCollapse ? Expand : Fold" 
            @click="toggleCollapse"
            class="collapse-btn glass-effect"
          />
          <h1 class="logo">Admin Pro</h1>
        </div>
        <div class="user-info">
          <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">管理员</span>
          <el-button 
            type="text" 
            @click="toggleTheme"
            class="theme-toggle"
          >
            <el-icon :size="20">
              <svg v-if="isDarkTheme" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM6.34 7.75l-1.41-1.41c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zm12.02 12.02l-1.41-1.41c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM5.64 19.78l1.41-1.41c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0zM18.36 5.64l1.41-1.41c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-1.41 1.41c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0z"/>
              </svg>
            </el-icon>
          </el-button>
          <div class="notification" @click="showNotifications">
            <el-icon :size="20"><Bell /></el-icon>
            <span v-if="notificationCount > 0" class="notification-badge"></span>
          </div>
        </div>
      </div>
    </el-header>
    
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '220px'" class="sidebar">
        <el-menu
          :default-active="$route.path"
          :background-color="isDarkTheme ? 'var(--primary-color)' : '#001529'"
          text-color="#b7bdc3"
          active-text-color="#fff"
          router
          class="side-menu"
        >
          <el-menu-item index="/dashboard" :route="{ path: '/dashboard' }">
            <el-icon><Monitor /></el-icon>
            <span>工作台</span>
          </el-menu-item>
          <el-sub-menu index="manager">
            <template #title>
              <el-icon><Monitor /></el-icon>
              <span>管理系统</span>
            </template>
            <el-menu-item index="/manager/menuManager" :route="{ path: '/manager/menuManager' }">
              <span>菜品管理</span>
            </el-menu-item>
            <el-menu-item index="/manager/categoryManager" :route="{ path: '/manager/categoryManager' }">
              <span>菜品类别管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/user" :route="{ path: '/user' }">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/setting" :route="{ path: '/setting' }">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
          <el-menu-item index="/document" :route="{ path: '/document' }">
            <el-icon><Document /></el-icon>
            <span>文档管理</span>
          </el-menu-item>
          <el-menu-item index="/analysis" :route="{ path: '/analysis' }">
            <el-icon><TrendCharts /></el-icon>
            <span>数据分析</span>
          </el-menu-item>
          <el-menu-item index="/permission">
            <el-icon><Lock /></el-icon>
            <span>权限管理</span>
          </el-menu-item>
          <el-menu-item index="/logs">
            <el-icon><List /></el-icon>
            <span>日志管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

  <el-main class="main-content" style="overflow: auto">
        <transition name="page-transition">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </transition>
        <div v-if="isLoading" class="progress-bar"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header {
  background: rgba(10, 26, 47, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(74, 223, 255, 0.2);
  color: var(--text-primary);
  padding: 0 24px;
  box-shadow: var(--glow-effect);
  position: relative;
  z-index: 2;
}

.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: 'Orbitron', sans-serif;
}

.logo::before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background: url('@/assets/logo.svg') no-repeat center;
  background-size: contain;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  padding-right: 40px;
}

.user-info::after {
  content: '';
  right: -20%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
}

.theme-toggle {
  margin-right: 12px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
  color: var(--text-primary);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
}

.notification:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-badge {
  position: absolute;
  margin-right: 5px;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: #f56c6c;
  border-radius: 50%;
  animation: glow 2s infinite;
}

.username {
  font-size: 14px;
}

.sidebar {
  background-color: var(--primary-color);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  border-right: 1px solid var(--accent-color);
  overflow-y: scroll;
}

:root {
  --primary-color: #001529;
  --bg-color: #f5f7f9;
  --text-primary: #2c3e50;
  --accent-color: #409EFF;
  --menu-bg: transparent;
  --menu-text: #b7bdc3;
  --menu-hover-bg: rgba(255, 255, 255, 0.1);
  --menu-hover-text: #ffffff;
  --menu-active-bg: #409EFF;
  --menu-active-text: #ffffff;
  --gradient-bg: linear-gradient(145deg, #001529 0%, #002140 100%);
  --glow-effect: 0 4px 12px rgba(0, 0, 0, 0.1);
  --inner-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] {
  --primary-color: #1a1a1a;
  --bg-color: #2d2d2d;
  --text-primary: #ffffff;
  --accent-color: #67c23a;
  --menu-bg: #1a1a1a;
  --menu-text: #b7bdc3;
  --menu-hover-bg: rgba(255, 255, 255, 0.1);
  --menu-hover-text: #ffffff;
  --menu-active-bg: #67c23a;
  --menu-active-text: #ffffff;
  --gradient-bg: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%);
  --glow-effect: 0 4px 12px rgba(0, 0, 0, 0.3);
  --inner-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.left-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.collapse-btn {
  background: transparent;
  border: none;
  color: white;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.side-menu .el-menu-item {
  margin: 8px;
  border-radius: 8px;
  height: 48px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--menu-bg);
  color: var(--menu-text);
}

.side-menu .el-menu-item:hover {
  background-color: var(--menu-hover-bg) !important;
  color: var(--menu-hover-text);
  transform: translateX(8px);
}

.side-menu .el-menu-item.is-active {
  background: linear-gradient(145deg, var(--accent-color), var(--accent-light)) !important;
  box-shadow: 0 4px 15px rgba(74, 223, 255, 0.2);
  color: var(--menu-active-text);
  font-weight: 500;
}

.side-menu .el-menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #409EFF;
  transform: translateX(-100%);
  transition: transform 0.3s;
}

.side-menu .el-menu-item:hover::before {
  transform: translateX(0);
}

.side-menu .el-menu-item .el-icon {
  margin-right: 8px;
  transition: transform 0.3s;
}

.side-menu .el-menu-item:hover .el-icon {
  transform: scale(1.1);
}

.menu-badge {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  background: #f56c6c;
  color: white;
}

.side-menu .el-menu-item span {
  transition: opacity 0.3s;
}

.side-menu.collapsed .el-menu-item span {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.side-menu {
  border-right: none;
}

.side-menu .el-menu-item {
  margin: 4px 0;
  border-radius: 4px;
  transition: all 0.3s;
}

.side-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.side-menu .el-menu-item.is-active {
  background-color: #409EFF !important;
}

.main-content {
  padding: 0;
  background-color: rgba(10, 26, 47, 0.05);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: auto;
  height: calc(100vh - 60px);
  margin: 0;
  box-sizing: border-box;
  box-shadow: var(--inner-shadow);
  border-left: 1px solid var(--accent-color);
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #67c23a);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(64,158,255,0.2);
}

body {
  margin: 0;
  overflow: hidden;
}

html, body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  overflow: hidden;
}

.el-main {
  padding: 0 !important;
}

.el-container {
  overflow: hidden;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-aside {
  overflow: hidden !important;
  height: calc(100vh - 60px);
}

.el-main {
  overflow: hidden !important;
  height: calc(100vh - 60px);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.glass-effect:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(74, 223, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(74, 223, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(74, 223, 255, 0.2); }
}

.notification-badge {
  animation: glow 2s infinite;
}
</style>
