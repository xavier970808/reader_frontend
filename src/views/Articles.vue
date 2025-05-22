<template>
  <div style="padding: 24px;">
    <h1>書本列表</h1>
    <div style="margin-bottom: 16px; color: #999;">
      API Base URL: {{ apiBaseUrl }}
    </div>

    <a-list :data="folderList" bordered>
      <template #item="{ item }">
        <a-list-item>
          <router-link :to="`/folder/${encodeURIComponent(item)}`">
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

// 讀取環境變數
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// 原始完整路徑列表
const epubList = ref([])
// 目錄(書名)列表
const folderList = ref([])

async function fetchEpubs() {
  try {
    const res = await axios.get(`${apiBaseUrl}/api/list-epubs`)
    epubList.value = res.data
    // 提取第一層資料夾名稱並去重
    const folders = epubList.value.map(path => path.split('/')[0])
    folderList.value = [...new Set(folders)]
  } catch (err) {
    console.error('❌ 取得 EPUB 列表失敗:', err)
  }
}

onMounted(fetchEpubs)
</script>

<style scoped>
/* 調整清單寬度或其他樣式 */
</style>
