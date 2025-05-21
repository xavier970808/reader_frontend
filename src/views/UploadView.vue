<template>
  <div style="padding: 24px; max-width: 600px; margin: auto;">
    <a-page-header title="上傳 EPUB 檔案" @back="goBack" />

    <div style="margin-top: 24px;">
      <a-upload
        accept=".epub"
        :before-upload="beforeUpload"
        :show-upload-list="false"
      >
        <a-button type="primary">選擇 EPUB 檔案</a-button>
      </a-upload>
    </div>

    <div v-if="selectedFile" style="margin-top: 16px;">
      <p>已選擇：{{ selectedFile.name }}</p>
      <a-button
        type="primary"
        :loading="uploading"
        @click="uploadFile"
      >上傳</a-button>
    </div>

    <a-alert
      v-if="message"
      :type="messageType"
      style="margin-top: 16px;"
      :message="message"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const selectedFile = ref(null)
const uploading = ref(false)
const message = ref('')
const messageType = ref('success')

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

function beforeUpload(file) {
  selectedFile.value = file
  return false
}

async function uploadFile() {
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
    message.value = res.data.message
    messageType.value = 'success'
    // 上傳成功後前往文章列表並刷新
    router.push('/articles')
  } catch (err) {
    console.error('上傳失敗', err)
    message.value = err.response?.data?.error || '上傳失敗'
    messageType.value = 'error'
  } finally {
    uploading.value = false
  }
}

function goBack() {
  router.back()
}
</script>

<style scoped>
</style>
