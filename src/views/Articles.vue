<template>
  <div style="padding: 24px;">
    <h1>書本列表</h1>
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

const epubList = ref([])
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function fetchEpubs() {
  try {
    const res = await axios.get(`${apiBaseUrl}/api/list-epubs`)
    epubList.value = res.data
  } catch (err) {
    console.error('載入 EPUB 清單失敗:', err)
  }
}

onMounted(fetchEpubs)
</script>
