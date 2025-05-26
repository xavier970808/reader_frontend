<template>
  <div style="padding: 24px;">
    <a-page-header :title="filename" @back="goBack" />

    <div v-if="loading">載入中...</div>

    <div v-else>
      <a-collapse>
        <a-collapse-item
          v-for="(c, i) in chapters"
          :key="i"
          :title="`第 ${i + 1} 章`"
        >
          <!-- 用 v-html 渲染含 <img> 的 HTML -->
          <div class="text-lg" v-html="c"></div>
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
  try {
    const res = await axios.post(
      `${apiBaseUrl}/api/read-epub`,
      { filename }
    )
    console.log('🔍 raw chapter HTML:', res.data[0].slice(0,200))
    chapters.value = res.data
  } catch (err) {
    console.error('❌ 章節載入錯誤:', err)
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

<style scoped>
a-collapse-item { margin-bottom: 12px; }
.text-lg { font-size: 17px; line-height: 1.5; }
</style>
