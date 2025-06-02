<template>
  <div style="padding: 24px;">
    <a-page-header :title="name" @back="back" />

    <div v-if="busy">載入中...</div>

    <div v-else>
      <a-collapse>
        <a-collapse-item
          v-for="(c, i) in chaps"
          :key="i"
          :title="`第 ${i + 1} 章`"
        >
          <p style="white-space: pre-wrap" class="text-lg">{{ c }}</p>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// 取得路由參數 filename（經 decodeURIComponent 解碼）
const rt = useRoute()
const nav = useRouter()
const name = decodeURIComponent(rt.params.filename) // 檔名（含路徑）

// 狀態：章節內容、是否忙碌中
const chaps = ref([]) 
const busy = ref(true) 

// 後端 API 網址
const apiUrl = import.meta.env.VITE_API_BASE_URL 

// 抓取章節內容
async function getChaps() {
  try {
    const res = await axios.post(
      `${apiUrl}/api/read-epub`,
      { filename: name }
    )
    chaps.value = res.data
  } catch (err) {
    console.error('❌ 章節載入錯誤:', err)
    chaps.value = ['⚠️ 章節載入失敗']
  } finally {
    busy.value = false
  }
}

// 返回上一頁（文章列表）
function back() {
  nav.push('/articles')
}

onMounted(getChaps)
</script>

<style scoped>
/* 可自行調整樣式 */
a-collapse-item {
  margin-bottom: 12px;
}

.text-lg {
  font-size: 17px;
  line-height: 1.5;
}
</style>
