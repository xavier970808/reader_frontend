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

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ChapterReader',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const filename = decodeURIComponent(route.params.filename)
    const chapters = ref([])
    const loading = ref(true)

    console.log('傳送給後端的 filename：', filename)


    const fetchChapters = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

      const res = await axios.post(`${apiBaseUrl}/api/read-epub`, {
          filename
        })
        chapters.value = res.data

      } catch (err) {
        console.error('載入章節失敗:', err)
        if (err.response && err.response.data && err.response.data.error) {
            chapters.value = [`⚠️ ${err.response.data.error}`]
        } else {
            chapters.value = ['⚠️ 無法載入章節內容。']
        }
    }
      finally {
        loading.value = false
      }
    }

    const goBack = () => {
      router.push('/articles')
    }

    onMounted(() => {
      fetchChapters()
    })

    return {
      filename,
      chapters,
      loading,
      goBack
    }
  }
}
</script>

<style scoped>
a-collapse-item {
  margin-bottom: 16px;
}
</style>
