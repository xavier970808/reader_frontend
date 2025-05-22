<template>
  <div style="padding:24px;">
    <a-page-header :title="filename" @back="goBack" />
    <div v-if="loading">載入中...</div>
    <div v-else>
      <a-collapse>
        <a-collapse-item v-for="(c,i) in chapters" :key="i" :title="`第 ${i+1} 章`">
          <p style="white-space:pre-wrap">{{ c }}</p>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const filename = decodeURIComponent(route.params.filename)
const chapters = ref([])
const loading = ref(true)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function fetchChapters() {
  const url = `${apiBaseUrl}/api/read-epub`
  console.log('📡 请求 URL:', url)
  console.log('📤 请求 Payload:', { filename })

  try {
    const res = await axios.post(url, { filename })
    console.log('📥 后端返回:', res.status, res.data)
    chapters.value = res.data
  } catch (err) {
    console.error('❌ axios 错误对象:', err)
    if (err.response) {
      console.error('❌ 后端状态码:', err.response.status)
      console.error('❌ 后端返回内容:', err.response.data)
    }
    chapters.value = ['⚠️ 章節載入失敗']
  } finally {
    loading.value = false
  }
}
function goBack() {
  router.push('/articles')
}

onMounted(fetchChapters)
</script>