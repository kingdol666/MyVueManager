<template>
  <div class="document-page">
    <div class="page-header">
      <h2>文档管理</h2>
      <el-button type="primary" class="glass-effect" @click="handleAdd">
        <el-icon><Plus /></el-icon>新建文档
      </el-button>
    </div>

    <div class="content-wrapper">
      <el-table :data="documents" class="custom-table">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发布' ? 'success' : 'warning'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新建文档' : '编辑文档'"
      width="50%"
      class="custom-dialog"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文档标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="技术文档" value="技术文档" />
            <el-option label="产品文档" value="产品文档" />
            <el-option label="使用手册" value="使用手册" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="草稿">草稿</el-radio>
            <el-radio label="已发布">已发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="form.content"
            type="textarea"
            rows="6"
            placeholder="请输入文档内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const documents = ref([
  {
    id: 1,
    title: '系统使用手册',
    category: '使用手册',
    updateTime: '2024-03-15 10:30:00',
    status: '已发布'
  },
  {
    id: 2,
    title: 'API接口文档',
    category: '技术文档',
    updateTime: '2024-03-14 15:20:00',
    status: '草稿'
  }
])

const dialogVisible = ref(false)
const dialogType = ref('add')
const form = ref({
  title: '',
  category: '',
  status: '草稿',
  content: ''
})

const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    title: '',
    category: '',
    status: '草稿',
    content: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该文档吗？', '提示', {
    type: 'warning'
  }).then(() => {
    documents.value = documents.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  })
}

const handleSubmit = () => {
  if (dialogType.value === 'add') {
    documents.value.push({
      ...form.value,
      id: documents.value.length + 1,
      updateTime: new Date().toLocaleString()
    })
    ElMessage.success('创建成功')
  } else {
    const index = documents.value.findIndex(item => item.id === form.value.id)
    documents.value[index] = {
      ...form.value,
      updateTime: new Date().toLocaleString()
    }
    ElMessage.success('更新成功')
  }
  dialogVisible.value = false
}
</script>

<style scoped>
.document-page {
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

.content-wrapper {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(74, 223, 255, 0.1);
}

.custom-table {
  --el-table-border-color: rgba(74, 223, 255, 0.1);
  --el-table-header-bg-color: rgba(10, 26, 47, 0.6);
  --el-table-row-hover-bg-color: rgba(74, 223, 255, 0.1);
}

.custom-dialog {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-dialog) {
  background: rgba(10, 26, 47, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(74, 223, 255, 0.2);
}

:deep(.el-dialog__title) {
  color: var(--text-primary);
}

:deep(.el-form-item__label) {
  color: var(--text-secondary);
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(74, 223, 255, 0.2);
  color: var(--text-primary);
}

:deep(.el-button--primary) {
  background: linear-gradient(145deg, var(--accent-color), var(--accent-light));
  border: none;
}

:deep(.el-button--primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(74, 223, 255, 0.3);
}
</style>
