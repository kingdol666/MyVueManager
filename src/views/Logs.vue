<template>
  <div class="logs-page">
    <div class="page-header">
      <h2>日志管理</h2>
      <div class="header-actions">
        <el-select v-model="logType" placeholder="日志类型" class="filter-item">
          <el-option label="全部日志" value="all" />
          <el-option label="操作日志" value="operation" />
          <el-option label="系统日志" value="system" />
          <el-option label="安全日志" value="security" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-item"
        />
        <el-button type="primary" class="glass-effect">
          <el-icon><Download /></el-icon>导出日志
        </el-button>
      </div>
    </div>

    <div class="content-wrapper">
      <el-table :data="logs" class="custom-table">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getTagType(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="操作人" width="120" />
        <el-table-column prop="ip" label="IP地址" width="140" />
        <el-table-column prop="action" label="操作内容" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="text" @click="showDetail(row)">
              <el-icon><View /></el-icon>详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>

    <el-dialog
      v-model="detailVisible"
      title="日志详情"
      width="60%"
      class="custom-dialog"
    >
      <div class="log-detail">
        <div v-for="(value, key) in currentLog" :key="key" class="detail-item">
          <span class="detail-label">{{ formatLabel(key) }}：</span>
          <span class="detail-value">{{ value }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download, View } from '@element-plus/icons-vue'

const logType = ref('all')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(100)
const detailVisible = ref(false)
const currentLog = ref({})

const logs = ref([
  {
    time: '2024-03-15 14:30:00',
    type: '操作日志',
    user: '管理员',
    ip: '192.168.1.100',
    action: '修改系统配置',
    status: 'success',
    detail: '修改了系统主题配置'
  },
  {
    time: '2024-03-15 14:28:00',
    type: '安全日志',
    user: '系统',
    ip: '192.168.1.101',
    action: '检测到异常登录',
    status: 'error',
    detail: 'IP地址异常，已自动拦截'
  }
])

const getTagType = (type) => {
  const types = {
    '操作日志': 'primary',
    '系统日志': 'success',
    '安全日志': 'danger'
  }
  return types[type] || 'info'
}

const showDetail = (row) => {
  currentLog.value = row
  detailVisible.value = true
}

const formatLabel = (key) => {
  const labels = {
    time: '时间',
    type: '类型',
    user: '操作人',
    ip: 'IP地址',
    action: '操作内容',
    status: '状态',
    detail: '详细信息'
  }
  return labels[key] || key
}
</script>

<style scoped>
.logs-page {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h2 {
  margin: 0;
  background: linear-gradient(to right, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.filter-item {
  width: 180px;
}

.content-wrapper {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.log-detail {
  display: grid;
  gap: 16px;
}

.detail-item {
  display: flex;
  gap: 8px;
}

.detail-label {
  color: var(--text-secondary);
  width: 100px;
  text-align: right;
}

.detail-value {
  color: var(--text-primary);
  flex: 1;
}

:deep(.el-table) {
  background: transparent !important;
}

:deep(.el-table th),
:deep(.el-table tr) {
  background: transparent !important;
}

:deep(.el-table--border) {
  border-color: rgba(74, 223, 255, 0.1) !important;
}
</style> 