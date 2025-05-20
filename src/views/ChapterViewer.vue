<template>
  <div style="padding: 24px;">
    <a-page-header :title="filename" @back="goBack">
      <template #subtitle>EPUB 章節第 {{ chapterIndex + 1 }} 章</template>
    </a-page-header>

    <div v-if="loading">載入中...</div>

    <div v-else>
      <p style="white-space: pre-wrap;">{{ chapter }}</p>

      <div style="margin-top: 24px; text-align: center;">
        <a-button @click="prevChapter" :disabled="chapterIndex <= 0">上一章</a-button>
        <a-button @click="nextChapter" style="margin-left: 12px;" :disabled="chapterIndex >= totalChapters - 1">
          下一章
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ChapterViewer',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const filename = decodeURIComponent(route.params.filename)
    const chapterIndex = ref(parseInt(route.params.chapterIndex))
    const chapter = ref('')
    const totalChapters = ref(0)
    const loading = ref(true)

    const apiBaseUrl = import.meta.env.production.VITE_API_BASE_URL

    const fetchChapter = async () => {
      loading.value = true
      try {
        const res = await axios.post(`${apiBaseUrl}/api/read-epub`, {
          filename,
          chapterIndex: chapterIndex.value
        })
        chapter.value = res.data.chapter
        totalChapters.value = res.data.totalChapters
      } catch (err) {
        console.error('章節載入失敗:', err)
        chapter.value = '⚠️ 章節載入失敗。'
      } finally {
        loading.value = false
      }
    }

    const prevChapter = () => {
      if (chapterIndex.value > 0) {
        router.push(`/chapter/${encodeURIComponent(filename)}/${chapterIndex.value - 1}`)
      }
    }

    const nextChapter = () => {
      if (chapterIndex.value < totalChapters.value - 1) {
        router.push(`/chapter/${encodeURIComponent(filename)}/${chapterIndex.value + 1}`)
      }
    }

    const goBack = () => {
      router.push('/articles')
    }

    watch(() => route.params.chapterIndex, (newVal) => {
      chapterIndex.value = parseInt(newVal)
      fetchChapter()
    })

    onMounted(() => {
      fetchChapter()
    })

    return {
      filename,
      chapterIndex,
      chapter,
      totalChapters,
      loading,
      prevChapter,
      nextChapter,
      goBack
    }
  }
}
</script>
