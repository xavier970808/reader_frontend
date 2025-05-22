<template>
  <div style="padding: 24px;">
    <a-page-header :title="filename" @back="goBack">
      <template #subtitle>EPUB 章節閱讀器</template>
    </a-page-header>

    <div v-if="loading">載入中...</div>

    <div v-else>
      <a-collapse>
        <a-collapse-item v-for="(chapter, index) in chapters" :key="index" :title="`第 ${index + 1} 章`">
          <p style="white-space: pre-wrap;">{{ chapter }}</p>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const bookname = decodeURIComponent(route.params.bookname)
const chapters = ref([])
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

async function fetchChapters() {
  try {
    const res = await axios.post(`${apiBaseUrl}/api/read-book`, {
      bookname
    })
    if (res.data.error) {
      chapters.value = [`⚠️ ${res.data.error}`]
    } else {
      chapters.value = res.data
    }
  } catch (err) {
    console.error(err)
    chapters.value = ['⚠️ 讀取失敗']
  }
}

onMounted(fetchChapters)
</script>
