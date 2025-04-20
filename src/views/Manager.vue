<template>
  <div class="manager-container">
    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">增加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="price" label="价格" width="100">
        <template #default="scope">
          {{ formatPrice(scope.row.price) }}
        </template>
      </el-table-column>
      <el-table-column prop="imageUrl" label="图片" width="120">
         <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imageUrl"
              :preview-src-list="[scope.row.imageUrl]"
              fit="cover"
              v-if="scope.row.imageUrl"
            />
            <span v-else>无图</span>
          </template>
      </el-table-column>
      <el-table-column prop="available" label="是否可用" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.available ? 'success' : 'danger'">
            {{ scope.row.available ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
       <el-table-column prop="isRecommend" label="是否推荐" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.isRecommend ? 'success' : 'info'">
            {{ scope.row.isRecommend ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="salesCount" label="销量" width="80" />
      <el-table-column prop="categoryName" label="分类" />
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

    <!-- Add/Edit Dialog (Placeholder) -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <span>这里是增加/编辑表单内容</span>
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

// --- Mock Data Fetching ---
const fetchData = async () => {
  loading.value = true;
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate mock data based on pagination
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  const mockData = Array.from({ length: 100 }, (_, i) => ({ // Total 100 mock items
    id: i + 1,
    name: `商品 ${i + 1}`,
    description: `这是商品 ${i + 1} 的描述信息`,
    price: (Math.random() * 100).toFixed(2),
    imageUrl: `https://via.placeholder.com/100?text=Img${i+1}`, // Placeholder image
    available: Math.random() > 0.3,
    isRecommend: Math.random() > 0.7,
    salesCount: Math.floor(Math.random() * 1000),
    categoryId: Math.floor(Math.random() * 5) + 1,
    categoryName: `分类 ${Math.floor(Math.random() * 5) + 1}`,
    createTime: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    updateTime: new Date().toISOString(),
  }));

  tableData.value = mockData.slice(start, end);
  pagination.total = mockData.length; // Update total count
  loading.value = false;
};

// --- Lifecycle Hook ---
onMounted(() => {
  fetchData();
});

// --- Event Handlers ---
const handleAdd = () => {
  dialogTitle.value = '增加数据';
  // Reset form data if needed
  dialogVisible.value = true;
};

const handleEdit = (index, row) => {
  console.log('Edit:', index, row);
  dialogTitle.value = '编辑数据';
  // Populate form with row data
  dialogVisible.value = true;
};

const handleDelete = (index, row) => {
  console.log('Delete:', index, row);
  ElMessageBox.confirm(
    `确定要删除 ID 为 ${row.id} 的数据吗?`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // Simulate delete API call
      tableData.value.splice(index, 1);
      // Adjust total count if necessary or refetch data
      pagination.total--; // Simple adjustment for mock data
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      // Optionally refetch data: fetchData();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};

const handleSizeChange = (newSize) => {
  pagination.pageSize = newSize;
  pagination.currentPage = 1; // Reset to first page when size changes
  fetchData();
};

const handleCurrentChange = (newPage) => {
  pagination.currentPage = newPage;
  fetchData();
};

const handleDialogConfirm = () => {
  // Handle form submission (add or edit)
  // Simulate API call
  ElMessage.success(`${dialogTitle.value} 操作成功`);
  dialogVisible.value = false;
  fetchData(); // Refetch data after add/edit
};

// --- Utility Functions ---
const formatPrice = (price) => {
  return price ? `¥${Number(price).toFixed(2)}` : '-';
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return '-';
  try {
    return new Date(dateTime).toLocaleString();
  } catch (e) {
    return dateTime; // Return original if parsing fails
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
