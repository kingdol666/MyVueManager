<template>
  <div class="setting-page">
    <div class="page-header">
      <h2>系统设置</h2>
    </div>

    <div class="content-wrapper">
      <el-tabs type="border-card" class="custom-tabs">
        <el-tab-pane label="基础设置">
          <el-form :model="basicSettings" label-width="120px">
            <el-form-item label="系统名称">
              <el-input v-model="basicSettings.systemName" />
            </el-form-item>
            <el-form-item label="系统Logo">
              <el-upload
                class="logo-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleLogoChange"
              >
                <img v-if="basicSettings.logo" :src="basicSettings.logo" class="logo" />
                <el-icon v-else class="logo-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="系统描述">
              <el-input
                v-model="basicSettings.description"
                type="textarea"
                rows="4"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置">
          <el-form :model="securitySettings" label-width="120px">
            <el-form-item label="密码有效期">
              <el-input-number
                v-model="securitySettings.passwordExpireDays"
                :min="0"
                :max="365"
              />
              <span class="form-tip">天 (0表示永不过期)</span>
            </el-form-item>
            <el-form-item label="登录失败锁定">
              <el-switch
                v-model="securitySettings.loginLockEnabled"
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
            <el-form-item label="失败次数限制" v-if="securitySettings.loginLockEnabled">
              <el-input-number
                v-model="securitySettings.maxLoginAttempts"
                :min="1"
                :max="10"
              />
              <span class="form-tip">次</span>
            </el-form-item>
            <el-form-item label="锁定时间" v-if="securitySettings.loginLockEnabled">
              <el-input-number
                v-model="securitySettings.lockDuration"
                :min="1"
                :max="1440"
              />
              <span class="form-tip">分钟</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="通知设置">
          <el-form :model="notificationSettings" label-width="120px">
            <el-form-item label="邮件通知">
              <el-switch
                v-model="notificationSettings.emailEnabled"
                active-text="启用"
                inactive-text="禁用"
              />
            </el-form-item>
            <template v-if="notificationSettings.emailEnabled">
              <el-form-item label="SMTP服务器">
                <el-input v-model="notificationSettings.smtpServer" />
              </el-form-item>
              <el-form-item label="SMTP端口">
                <el-input v-model="notificationSettings.smtpPort" />
              </el-form-item>
              <el-form-item label="发件人邮箱">
                <el-input v-model="notificationSettings.senderEmail" />
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="form-actions">
        <el-button type="primary" @click="handleSave">保存设置</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const basicSettings = ref({
  systemName: 'Admin Pro',
  logo: '',
  description: '这是一个现代化的后台管理系统'
})

const securitySettings = ref({
  passwordExpireDays: 90,
  loginLockEnabled: true,
  maxLoginAttempts: 5,
  lockDuration: 30
})

const notificationSettings = ref({
  emailEnabled: false,
  smtpServer: '',
  smtpPort: '',
  senderEmail: ''
})

const handleLogoChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    basicSettings.value.logo = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

const handleSave = () => {
  ElMessage.success('设置保存成功')
}

const handleReset = () => {
  ElMessageBox.confirm('确定要重置所有设置吗？', '提示', {
    type: 'warning'
  }).then(() => {
    // 重置逻辑
    ElMessage.success('设置已重置')
  })
}
</script>

<style scoped>
.setting-page {
  padding: 24px;
}

.page-header {
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

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.el-tabs__item) {
  color: var(--text-secondary) !important;
}

:deep(.el-tabs__item.is-active) {
  color: var(--accent-color) !important;
}

.logo-uploader {
  border: 1px dashed var(--accent-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 100px;
}

.logo-uploader:hover {
  border-color: var(--el-color-primary);
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.logo {
  width: 200px;
  height: 100px;
  object-fit: contain;
}

.form-tip {
  margin-left: 8px;
  color: var(--text-secondary);
}

.form-actions {
  margin-top: 24px;
  text-align: center;
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(74, 223, 255, 0.2);
  color: var(--text-primary);
}

:deep(.el-switch__core) {
  border-color: var(--accent-color) !important;
}

:deep(.el-switch.is-checked .el-switch__core) {
  background-color: var(--accent-color) !important;
}
</style>
