<template>
  <a-layout>
    <a-layout-header
      style="display: flex; justify-content: space-between; align-items: center; padding: 24px; height: 64px; background: #fff;"
    >
      <h1 style="padding: 0;">新增文章</h1>
    </a-layout-header>
    <a-layout-content class="form-content" align="center">
      <a-form
        :model="form"
        :rules="rules"
        ref="uploadForm"
        style="width: 600px"
        @submit.prevent="handleSubmit"
      >
        <a-form-item field="title" label="標題">
          <a-input v-model="form.title" placeholder="請輸入標題" />
        </a-form-item>

        <a-form-item field="file" label="上傳 EPUB 檔案">
          <a-upload
            accept=".epub"
            :before-upload="beforeUpload"
            :show-upload-list="false"
          >
            <a-button type="primary">選擇 EPUB 檔案</a-button>
          </a-upload>
          <div v-if="selectedFile" style="margin-top: 8px;">
            已選擇：{{ selectedFile.name }}
          </div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="uploading">
            提交
          </a-button>
        </a-form-item>
      </a-form>

      <a-alert
        v-if="message"
        :type="messageType"
        style="margin-top: 16px;"
        :message="message"
      />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 表單狀態
const form = reactive({
  title: '',
})
const rules = reactive({
  title: { required: true, message: '請輸入標題', trigger: 'blur' },
  file: { required: true, message: '請上傳 EPUB 檔案', trigger: 'change' },
})

const uploadForm = ref(null)
const selectedFile = ref(null)
const uploading = ref(false)
const message = ref('')
const messageType = ref('success')
const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

function beforeUpload(file) {
  selectedFile.value = file
  // 驗證附檔名
  const isEpub = file.name.toLowerCase().endsWith('.epub')
  if (!isEpub) {
    messageType.value = 'error'
    message.value = '只允許上傳 .epub 檔案'
  }
  return isEpub ? false : Upload.LIST_IGNORE
}

async function handleSubmit() {
  await uploadForm.value.validate()
  if (!selectedFile.value) return

  uploading.value = true
  message.value = ''

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const res = await axios.post(
      `${apiBaseUrl}/api/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    message.value = '上傳成功: ' + res.data.filename
    messageType.value = 'success'
    // 上傳成功後導回列表並刷新
    router.push('/articles')
  } catch (err) {
    console.error('上傳失敗', err)
    message.value = err.response?.data?.error || '上傳失敗'
    messageType.value = 'error'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.form-content {
  padding: 24px;
}
</style>
