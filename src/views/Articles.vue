<template>
  <div class="articles-container">
    <a-layout>
      <a-layout-header style="background: #fff; padding: 24px;">
        <h1>文章列表</h1>
      </a-layout-header>
      <a-layout-content style="padding: 24px;">
        <a-list
          :data="epubList"
          :pagination-props="paginationProps"
          bordered
        >
          <template #item="{ item }">
            <a-list-item>
              <a-link :href="`/chapter/${encodeURIComponent(item)}`">{{ item }}</a-link>
            </a-list-item>
          </template>
        </a-list>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'Articles',
  setup() {
    const epubList = ref([])
    const paginationProps = reactive({
      defaultPageSize: 10,
      total: 0
    })

    const apiBaseUrl = import.meta.env.production.VITE_API_BASE_URL

    const fetchEpubList = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/list-epubs`)
        epubList.value = res.data
        paginationProps.total = res.data.length
      } catch (err) {
        console.error('載入 EPUB 清單失敗:', err)
      }
    }

    onMounted(() => {
      fetchEpubList()
    })

    return {
      epubList,
      paginationProps
    }
  }
}
</script>

<style scoped>
.articles-container {
  width: 100%;
  margin: 0 auto;
}
</style>
