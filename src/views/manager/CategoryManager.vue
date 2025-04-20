<template>
  <div class="manager-container">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">增加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="available" label="是否可用" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.available ? 'success' : 'danger'">
            {{ scope.row.available ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template #default="scope">
          {{ formatDateTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180">
        <template #default="scope">
          {{ formatDateTime(scope.row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="700px">
      <el-form :model="formData" label-width="120px" :rules="rules" ref="formRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入分类名称" />
        </el-form-item>
        
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="请输入分类描述"
            style="width: 100%"
          />
        </el-form-item>
        
        <el-form-item label="是否可用" prop="available">
          <el-switch v-model="formData.available" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const loading = ref(false);
const tableData = ref([]);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const dialogVisible = ref(false);
const dialogTitle = ref('');

const fetchData = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));

  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  const mockData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `分类 ${i + 1}`,
    description: `这是分类 ${i + 1} 的描述信息`,
    available: Math.random() > 0.3,
    createTime: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    updateTime: new Date().toISOString(),
  }));

  tableData.value = mockData.slice(start, end);
  pagination.total = mockData.length;
  loading.value = false;
};

onMounted(() => {
  fetchData();
});

const formData = ref({
  id: null,
  name: '',
  description: '',
  available: true,
  createTime: '',
  updateTime: ''
});

const formRef = ref(null);
const rules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }]
};

const handleDialogConfirm = async () => {
  try {
    await formRef.value.validate();
    
    const now = new Date().toISOString();
    if (dialogTitle.value === '增加数据') {
      formData.value.createTime = now;
      formData.value.id = tableData.value.length + 1;
    }
    formData.value.updateTime = now;
    
    if (dialogTitle.value === '增加数据') {
      tableData.value.unshift({...formData.value});
      pagination.total++;
    } else {
      const index = tableData.value.findIndex(item => item.id === formData.value.id);
      if (index !== -1) {
        tableData.value[index] = {...formData.value};
      }
    }
    
    ElMessage.success(`${dialogTitle.value}成功`);
    dialogVisible.value = false;
  } catch (error) {
    console.error('表单验证失败:', error);
  }
};

const handleAdd = () => {
  dialogTitle.value = '增加数据';
  formData.value = {
    id: null,
    name: '',
    description: '',
    available: true,
    createTime: '',
    updateTime: ''
  };
  dialogVisible.value = true;
};

const handleEdit = (index, row) => {
  dialogTitle.value = '编辑数据';
  formData.value = {...row};
  dialogVisible.value = true;
};

const handleDelete = (index, row) => {
  ElMessageBox.confirm(
    `确定要删除 ID 为 ${row.id} 的分类吗?`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      tableData.value.splice(index, 1);
      pagination.total--;
      ElMessage.success('删除成功');
    })
    .catch(() => {
      ElMessage.info('取消删除');
    });
};

const handleSizeChange = (newSize) => {
  pagination.pageSize = newSize;
  pagination.currentPage = 1;
  fetchData();
};

const handleCurrentChange = (newPage) => {
  pagination.currentPage = newPage;
  fetchData();
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return '-';
  try {
    return new Date(dateTime).toLocaleString();
  } catch (e) {
    return dateTime;
  }
};
</script>

<style scoped>
.manager-container {
  padding: 20px;
}

.toolbar {
  margin-bottom: 15px;
}

.pagination-container {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
