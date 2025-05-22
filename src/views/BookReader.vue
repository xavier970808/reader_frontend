<template>
  <div style="padding: 24px;">
    <h2>{{ bookname }}</h2>
    <a-collapse>
      <a-collapse-item v-for="(chapter, index) in chapters" :key="index" :title="`第 ${index + 1} 章`">
        <p style="white-space: pre-wrap;">{{ chapter }}</p>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const bookname = decodeURIComponent(route.params.bookname)
    const chapters = ref([])
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    const fetchChapters = async () => {
      const res = await axios.post(`${apiBaseUrl}/api/read-book`, { bookname })
      chapters.value = res.data
    }

    onMounted(fetchChapters)

    return { bookname, chapters }
  }
}
</script>
