<template>
  <div style="padding: 24px;">
    <a-page-header @back="goBack" :title="folderName" />
    <a-list :data="files" bordered style="margin-top: 16px;">
      <template #item="{ item }">
        <a-list-item>
          <!-- 顯示檔案名，不含資料夾前綴 -->
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

const route = useRoute()
const router = useRouter()
const folderName = decodeURIComponent(route.params.folderName)
const files = ref([])

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function fetchFiles() {
  try {
    const res = await axios.get(`${apiBaseUrl}/api/list-epubs`)
    // 過濾只屬於這個資料夾的檔案
    files.value = res.data.filter(path => path.split('/')[0] === folderName)
  } catch (err) {
    console.error('❌ 取得資料夾檔案失敗:', err)
  }
}

function goBack() {
  router.push('/articles')
}

onMounted(fetchFiles)
</script>

<style scoped>
/* 可自行調整 */
</style>
