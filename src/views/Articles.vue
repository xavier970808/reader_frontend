<template>
  <div style="padding: 24px;">
    <h1>書本列表</h1>
    <!-- 列表上方显示当前 API Base URL，确认环境变量正确 -->
    <div style="margin-bottom: 16px; color: #999;">
      API Base URL: {{ apiBaseUrl }}
    </div>

    <a-list :data="epubList" bordered>
      <template #item="{ item }">
        <a-list-item>
          <router-link :to="`/chapter/${encodeURIComponent(item)}`">
            {{ item }}
          </router-link>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 1. 读取环境变量
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// 2. 列表数据
const epubList = ref([])

async function fetchEpubs() {
  console.log('📡 使用的 API Base URL:', apiBaseUrl)
  try {
    const res = await axios.get(`${apiBaseUrl}/api/list-epubs`)
    console.log('📥 list-epubs 返回:', res.data)
    epubList.value = res.data
  } catch (err) {
    console.error('❌ 取得 EPUB 列表失敗:', err)
  }
}

onMounted(fetchEpubs)
</script>

<style scoped>
/* 你可以在这里调整样式 */
</style>
