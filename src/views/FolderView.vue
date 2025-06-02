<template>
  <div style="padding: 24px;">
    <a-page-header @back="back" :title="fld" />
    <a-list :data="fls" bordered style="margin-top: 16px;">
      <template #item="{ item }">
        <a-list-item>
          <!-- 顯示檔案名稱，不含資料夾前綴 -->
          <router-link :to="`/chapter/${encodeURIComponent(item)}`">
            {{ item.split('/').slice(-1)[0] }}
          </router-link>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const rt = useRoute()
const nav = useRouter()

// 當前資料夾名稱（書名）
const fld = decodeURIComponent(rt.params.folderName) 
const fls = ref([]) // 資料夾下的檔案清單

// 後端 API 網址
const apiUrl = import.meta.env.VITE_API_BASE_URL 

// 抓取該資料夾下的檔案
async function getFiles() {
  try {
    const res = await axios.get(`${apiUrl}/api/list-epubs`)
    // 過濾出屬於當前資料夾（fld）的路徑
    fls.value = res.data.filter(p => p.split('/')[0] === fld)
  } catch (err) {
    console.error('❌ 取得資料夾檔案失敗:', err)
  }
}

// 返回文章列表
function back() {
  nav.push('/articles')
}

onMounted(getFiles)
</script>

<style scoped>
/* 可自行調整樣式 */
</style>
