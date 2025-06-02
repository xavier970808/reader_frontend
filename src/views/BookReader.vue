<template>
  <div style="padding: 24px;">
    <h2>{{ bk }}</h2>
    <a-collapse>
      <a-collapse-item
        v-for="(c, i) in chaps"
        :key="i"
        :title="`第 ${i + 1} 章`"
      >
        <p style="white-space: pre-wrap;">{{ c }}</p>
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
    const rt = useRoute()
    const bk = decodeURIComponent(rt.params.bookname) // 書名（資料夾）
    const chaps = ref([]) // 存放章節內容
    const apiUrl = import.meta.env.VITE_API_BASE_URL // 後端 API 基本網址

    // 抓取整本書的章節
    const getChaps = async () => {
      const res = await axios.post(`${apiUrl}/api/read-book`, { bookname: bk })
      chaps.value = res.data
    }

    onMounted(getChaps)

    return { bk, chaps }
  }
}
</script>
