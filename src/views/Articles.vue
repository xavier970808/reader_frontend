<template>
  <div style="padding: 24px;">
    <h1>書本列表</h1>

    <a-list :data="folders" bordered>
      <template #item="{ item }">
        <a-list-item>
          <!-- 點擊書名後導向對應資料夾內的章節 -->
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

// 從 .env 拿到後端 API 基本 URL
const apiUrl = import.meta.env.VITE_API_BASE_URL 

// 存放所有 epub 檔案的完整路徑
const epubs = ref([]) 
// 存放資料夾名稱（書名）的清單
const folders = ref([]) 

// 取得 epub 檔案列表
async function getEpubs() {
  try {
    const res = await axios.get(`${apiUrl}/api/list-epubs`)
    epubs.value = res.data
    // 取出路徑第一層作為書名
    const tmp = epubs.value.map(p => p.split('/')[0])
    folders.value = [...new Set(tmp)]
  } catch (err) {
    console.error('❌ 取得 EPUB 列表失敗:', err)
  }
}

onMounted(getEpubs)
</script>

<style scoped>
/* 可於此處調整清單或排版樣式 */
</style>
