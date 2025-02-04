<template>
  <div class="permission-page">
    <div class="page-header">
      <h2>权限管理</h2>
      <el-button type="primary" class="glass-effect" @click="handleAddRole">
        <el-icon><Plus /></el-icon>新增角色
      </el-button>
    </div>

    <div class="content-wrapper">
      <el-tabs type="border-card" class="custom-tabs">
        <el-tab-pane label="角色管理">
          <el-table :data="roles" class="custom-table">
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="code" label="角色标识" width="120" />
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="users" label="用户数" width="100" />
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-switch
                  v-model="row.status"
                  active-value="active"
                  inactive-value="inactive"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button-group>
                  <el-button size="small" @click="handleEditPermissions(row)">
                    权限配置
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDeleteRole(row)">
                    删除
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="菜单权限">
          <el-tree
            :data="menuTree"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            class="permission-tree"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 角色编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增角色' : '编辑角色'"
      width="50%"
      class="custom-dialog"
    >
      <el-form :model="roleForm" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色标识">
          <el-input v-model="roleForm.code" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            rows="3"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="roleForm.status"
            active-value="active"
            inactive-value="inactive"
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

const roles = ref([
  {
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    description: '系统最高权限',
    users: 1,
    status: 'active'
  },
  {
    name: '普通用户',
    code: 'USER',
    description: '普通用户权限',
    users: 50,
    status: 'active'
  }
])

const menuTree = ref([
  {
    id: 1,
    label: '系统管理',
    children: [
      { id: 11, label: '用户管理' },
      { id: 12, label: '角色管理' },
      { id: 13, label: '菜单管理' }
    ]
  },
  {
    id: 2,
    label: '内容管理',
    children: [
      { id: 21, label: '文章管理' },
      { id: 22, label: '评论管理' }
    ]
  }
])

const defaultProps = {
  children: 'children',
  label: 'label'
}

const dialogVisible = ref(false)
const dialogType = ref('add')
const roleForm = ref({
  name: '',
  code: '',
  description: '',
  status: 'active'
})

const handleAddRole = () => {
  dialogType.value = 'add'
  roleForm.value = {
    name: '',
    code: '',
    description: '',
    status: 'active'
  }
  dialogVisible.value = true
}

const handleEditPermissions = (row) => {
  // 实现权限编辑逻辑
}

const handleDeleteRole = (row) => {
  // 实现角色删除逻辑
}

const handleSubmit = () => {
  // 实现表单提交逻辑
  dialogVisible.value = false
}
</script>

<style scoped>
.permission-page {
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

.custom-tabs {
  background: transparent;
  border: none;
}

.permission-tree {
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

:deep(.el-tree) {
  background: transparent;
  color: var(--text-primary);
}

:deep(.el-tree-node__content:hover) {
  background: rgba(255, 255, 255, 0.05);
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: rgba(74, 223, 255, 0.1);
}
</style> 