<template>
  <div class="user-page">
    <div class="page-header">
      <h2>用户管理</h2>
      <el-button type="primary" class="glass-effect" @click="handleAdd">
        <el-icon><Plus /></el-icon>新增用户
      </el-button>
    </div>

    <div class="content-wrapper">
      <el-table :data="users" class="custom-table">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="avatar" label="头像" width="80">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'info'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              active-value="active"
              inactive-value="inactive"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="lastLogin" label="最后登录" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button 
                size="small" 
                type="danger" 
                @click="handleDelete(row)"
                :disabled="row.role === 'admin'"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增用户' : '编辑用户'"
      width="50%"
      class="custom-dialog"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogType === 'add'">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange"
          >
            <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const users = ref([
  {
    id: 1,
    username: 'admin',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-15 12:30:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 2,
    username: 'user1',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-14 18:20:00',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
])

const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)

const form = ref({
  username: '',
  password: '',
  role: 'user',
  status: 'active',
  avatar: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

// 处理函数实现...
const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    username: '',
    password: '',
    role: 'user',
    status: 'active',
    avatar: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    type: 'warning'
  }).then(() => {
    users.value = users.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  })
}

const handleStatusChange = (row) => {
  ElMessage.success(`用户 ${row.username} 状态已${row.status === 'active' ? '启用' : '禁用'}`)
}

const handleAvatarChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.avatar = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const handleSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (dialogType.value === 'add') {
        users.value.push({
          ...form.value,
          id: users.value.length + 1,
          lastLogin: '-'
        })
        ElMessage.success('创建成功')
      } else {
        const index = users.value.findIndex(item => item.id === form.value.id)
        users.value[index] = { ...form.value }
        ElMessage.success('更新成功')
      }
      dialogVisible.value = false
    }
  })
}
</script>

<style scoped>
.user-page {
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

.avatar-uploader {
  border: 1px dashed var(--accent-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

:deep(.el-switch__core) {
  border-color: var(--accent-color) !important;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: var(--accent-color) !important;
}
</style>
