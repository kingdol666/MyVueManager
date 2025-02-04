<template>
  <div class="analysis-page">
    <div class="page-header">
      <h2>数据分析</h2>
      <div class="header-actions">
        <el-select v-model="timeRange" placeholder="时间范围" class="time-select">
          <el-option label="最近7天" value="7" />
          <el-option label="最近30天" value="30" />
          <el-option label="最近90天" value="90" />
        </el-select>
        <el-button type="primary" class="glass-effect">
          <el-icon><Download /></el-icon>导出报告
        </el-button>
      </div>
    </div>

    <div class="analysis-grid">
      <div class="analysis-card performance">
        <h3>性能指标</h3>
        <div class="metrics-grid">
          <div class="metric-item">
            <div class="metric-value">98.5%</div>
            <div class="metric-label">系统可用性</div>
            <el-progress :percentage="98.5" status="success" />
          </div>
          <div class="metric-item">
            <div class="metric-value">125ms</div>
            <div class="metric-label">平均响应时间</div>
            <el-progress :percentage="85" status="warning" />
          </div>
          <div class="metric-item">
            <div class="metric-value">0.05%</div>
            <div class="metric-label">错误率</div>
            <el-progress :percentage="95" status="success" />
          </div>
        </div>
      </div>

      <div class="analysis-card traffic">
        <h3>流量分析</h3>
        <div class="chart" ref="trafficChart"></div>
      </div>

      <div class="analysis-card devices">
        <h3>设备分布</h3>
        <div class="chart" ref="deviceChart"></div>
      </div>

      <div class="analysis-card top-pages">
        <h3>热门页面</h3>
        <el-table :data="topPages" style="width: 100%">
          <el-table-column prop="page" label="页面" />
          <el-table-column prop="views" label="访问量" width="120" />
          <el-table-column prop="trend" label="趋势" width="120">
            <template #default="{ row }">
              <div class="trend-indicator" :class="row.trend">
                <el-icon><CaretTop v-if="row.trend === 'up'" /><CaretBottom v-else /></el-icon>
                {{ row.percentage }}%
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Download, CaretTop, CaretBottom } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const timeRange = ref('7')
const trafficChart = ref(null)
const deviceChart = ref(null)

const topPages = ref([
  { page: '首页', views: '45,230', trend: 'up', percentage: '12.5' },
  { page: '用户管理', views: '32,890', trend: 'up', percentage: '8.3' },
  { page: '数据分析', views: '28,450', trend: 'down', percentage: '3.2' },
  { page: '系统设置', views: '21,320', trend: 'up', percentage: '5.7' }
])

onMounted(() => {
  // 初始化流量分析图表
  const traffic = echarts.init(trafficChart.value)
  traffic.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'PV',
        type: 'bar',
        data: [320, 280, 750, 920, 870, 650, 400],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(74, 223, 255, 0.8)' },
            { offset: 1, color: 'rgba(74, 223, 255, 0.1)' }
          ])
        }
      }
    ]
  })

  // 初始化设备分布图表
  const device = echarts.init(deviceChart.value)
  device.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '桌面端' },
          { value: 735, name: '移动端' },
          { value: 580, name: '平板' },
          { value: 484, name: '其他' }
        ]
      }
    ]
  })

  window.addEventListener('resize', () => {
    traffic.resize()
    device.resize()
  })
})
</script>

<style scoped>
.analysis-page {
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

.time-select {
  width: 120px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.analysis-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.analysis-card h3 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
  font-size: 16px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.metric-item {
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.metric-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.chart {
  height: 300px;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  width: fit-content;
}

.trend-indicator.up {
  color: #67C23A;
  background: rgba(103, 194, 58, 0.1);
}

.trend-indicator.down {
  color: #F56C6C;
  background: rgba(245, 108, 108, 0.1);
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

.performance { grid-column: 1 / -1; }
.traffic { grid-column: 1 / 2; }
.devices { grid-column: 2 / 3; }
.top-pages { grid-column: 1 / -1; }
</style> 