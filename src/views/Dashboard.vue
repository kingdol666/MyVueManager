<template>
  <div class="dashboard-page">
    <div class="page-header">
      <h2>工作台</h2>
      <div class="header-actions">
        <el-button type="primary" class="glass-effect">
          <el-icon><Refresh /></el-icon>刷新数据
        </el-button>
      </div>
    </div>

    <!-- 快捷操作区 -->
    <div class="quick-actions">
      <div v-for="(action, index) in quickActions" :key="index" class="action-card hover-float">
        <div class="icon-wrapper" :class="action.type">
          <el-icon>
            <component :is="action.icon" />
          </el-icon>
        </div>
        <div class="action-info">
          <span class="action-name">{{ action.name }}</span>
          <span class="action-desc">{{ action.description }}</span>
        </div>
      </div>
    </div>

    <!-- 待办事项 -->
    <div class="todo-section card">
      <div class="section-header">
        <h3>待办事项</h3>
        <el-button type="text">
          <el-icon><More /></el-icon>查看更多
        </el-button>
      </div>
      <div class="todo-list">
        <div v-for="(todo, index) in todos" :key="index" class="todo-item" :class="{ 'high-priority': todo.priority === 'high' }">
          <div class="todo-content">
            <el-checkbox v-model="todo.done">
              <span :class="{ 'done': todo.done }">{{ todo.content }}</span>
            </el-checkbox>
            <div class="todo-time">
              <el-icon><component :is="todo.icon" /></el-icon>
              <span>{{ todo.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目进度 -->
    <div class="projects-section card">
      <div class="section-header">
        <h3>项目进度</h3>
        <el-button type="text">
          <el-icon><View /></el-icon>所有项目
        </el-button>
      </div>
      <div class="project-list">
        <div v-for="(project, index) in projects" :key="index" class="project-card hover-scale">
          <div class="project-header">
            <el-icon :class="project.status">
              <component :is="project.icon" />
            </el-icon>
            <div class="project-info">
              <h4>{{ project.name }}</h4>
              <p>{{ project.description }}</p>
            </div>
          </div>
          <div class="project-progress">
            <el-progress 
              :percentage="project.progress" 
              :status="project.status"
              :stroke-width="8"
            />
            <span class="progress-text">{{ project.progressText }}</span>
          </div>
          <div class="project-footer">
            <div class="project-members">
              <el-avatar 
                v-for="(member, idx) in project.members" 
                :key="idx"
                :size="28"
                :src="member.avatar"
              />
            </div>
            <div class="project-deadline">
              <el-icon><Timer /></el-icon>
              <span>{{ project.deadline }}</span>
            </div>
            <div class="project-actions">
              <el-tooltip
                v-for="(action, idx) in project.actions"
                :key="idx"
                :content="action.tooltip"
                placement="top"
              >
                <el-button 
                  :type="action.type" 
                  circle 
                  size="small"
                >
                  <el-icon><component :is="action.icon" /></el-icon>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统公告 -->
    <div class="announcement-section card">
      <div class="section-header">
        <h3>系统公告</h3>
        <el-tag type="warning" effect="dark" size="small">2 条未读</el-tag>
      </div>
      <div class="announcement-list">
        <div v-for="(notice, index) in announcements" :key="index" class="notice-item hover-scale">
          <div class="notice-content">
            <el-icon :class="notice.type">
              <component :is="notice.icon" />
            </el-icon>
            <el-tag 
              :type="notice.type" 
              effect="dark" 
              size="small" 
              class="notice-tag"
            >
              {{ notice.tag }}
            </el-tag>
            <span class="notice-text">{{ notice.content }}</span>
          </div>
          <span class="notice-time">{{ notice.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 确保所有图标都被正确导入
const {
  Refresh,
  UserFilled,
  Document,
  Setting,
  Bell,
  CircleCheck,
  Clock,
  Calendar,
  Timer,
  Connection,
  TrendCharts,
  Warning,
  InfoFilled,
  SuccessFilled,
  More,
  Edit,
  Delete,
  Share,
  View
} = ElementPlusIconsVue

const quickActions = [
  { 
    name: '用户管理', 
    icon: UserFilled, 
    type: 'primary',
    description: '用户信息管理'
  },
  { 
    name: '文档中心', 
    icon: Document, 
    type: 'success',
    description: '文档资源管理'
  },
  { 
    name: '系统设置', 
    icon: Setting, 
    type: 'warning',
    description: '系统配置管理'
  },
  { 
    name: '数据分析', 
    icon: TrendCharts, 
    type: 'info',
    description: '数据统计分析'
  },
  { 
    name: '消息通知', 
    icon: Bell, 
    type: 'danger',
    description: '系统消息管理'
  }
]

const todos = ref([
  { 
    content: '完成系统升级计划', 
    done: false, 
    time: '今天 14:00', 
    icon: Clock,
    priority: 'high'
  },
  { 
    content: '审核新用户申请', 
    done: true, 
    time: '今天 16:00', 
    icon: CircleCheck,
    priority: 'medium'
  },
  { 
    content: '更新系统文档', 
    done: false, 
    time: '明天 10:00', 
    icon: Calendar,
    priority: 'low'
  },
  { 
    content: '项目进度评审', 
    done: false, 
    time: '明天 15:00', 
    icon: Timer,
    priority: 'high'
  }
])

const projects = ref([
  {
    name: '系统升级项目',
    description: '对核心模块进行升级优化，提升系统性能',
    progress: 68,
    status: 'success',
    progressText: '进行中',
    icon: Connection,
    members: [
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
    ],
    deadline: '2024-04-01',
    actions: [
      { icon: Edit, type: 'primary', tooltip: '编辑' },
      { icon: Share, type: 'success', tooltip: '分享' },
      { icon: Delete, type: 'danger', tooltip: '删除' }
    ]
  },
  {
    name: '用户体验优化',
    description: '优化界面交互，提升用户体验',
    progress: 32,
    status: 'warning',
    progressText: '需要加快',
    icon: UserFilled,
    members: [
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
    ],
    deadline: '2024-03-25',
    actions: [
      { icon: Edit, type: 'primary', tooltip: '编辑' },
      { icon: Share, type: 'success', tooltip: '分享' },
      { icon: Delete, type: 'danger', tooltip: '删除' }
    ]
  }
])

const announcements = ref([
  {
    type: 'danger',
    tag: '重要',
    icon: Warning,
    content: '系统将于本周日凌晨2点进行升级维护',
    time: '10分钟前'
  },
  {
    type: 'warning',
    tag: '提醒',
    icon: InfoFilled,
    content: '请及时更新个人信息和密码',
    time: '2小时前'
  },
  {
    type: 'success',
    tag: '通知',
    icon: SuccessFilled,
    content: '新版本功能说明文档已发布',
    time: '1天前'
  }
])
</script>

<style scoped>
.dashboard-page {
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.page-header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h2 {
  margin: 0;
  background: linear-gradient(to right, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.quick-actions {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  font-size: 20px;
}

.icon-wrapper.primary { 
  color: var(--accent-color);
  background: rgba(74, 223, 255, 0.1);
}

.icon-wrapper.success { 
  color: var(--success-color);
  background: rgba(103, 194, 58, 0.1);
}

.icon-wrapper.warning { 
  color: var(--warning-color);
  background: rgba(230, 162, 60, 0.1);
}

.icon-wrapper.danger { 
  color: var(--danger-color);
  background: rgba(245, 108, 108, 0.1);
}

.icon-wrapper.info { 
  color: var(--info-color);
  background: rgba(144, 147, 153, 0.1);
}

:deep(.el-icon) {
  font-size: inherit;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

.action-card .icon-wrapper {
  transition: all var(--transition-normal);
}

.action-card:hover .icon-wrapper {
  transform: scale(1.1);
  box-shadow: var(--glow-effect);
}

.action-name {
  font-size: 16px;
  color: var(--text-primary);
}

.todo-section {
  grid-column: 1 / 2;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(74, 223, 255, 0.1);
}

.todo-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.todo-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-size: 12px;
}

.todo-time .el-icon {
  font-size: 14px;
}

.projects-section {
  grid-column: 2 / -1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.project-header {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.project-info h4 {
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.project-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.project-progress {
  margin: 16px 0;
}

.progress-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 8px;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-members {
  display: flex;
}

.project-members .el-avatar {
  margin-left: -8px;
  border: 2px solid rgba(0, 0, 0, 0.3);
}

.project-deadline {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-size: 12px;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.done {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.announcement-section {
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.notice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(74, 223, 255, 0.1);
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notice-text {
  color: var(--text-primary);
}

.notice-time {
  font-size: 12px;
  color: var(--text-secondary);
}

:deep(.el-checkbox__label) {
  color: var(--text-primary);
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: var(--text-secondary);
  text-decoration: line-through;
}

.action-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.high-priority {
  border-left: 3px solid var(--danger-color);
}

.hover-float {
  transition: transform 0.3s;
}

.hover-float:hover {
  transform: translateY(-2px);
}

.hover-scale {
  transition: transform 0.3s;
}

.hover-scale:hover {
  transform: scale(1.02);
}
</style>