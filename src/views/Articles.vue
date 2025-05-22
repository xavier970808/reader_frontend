<template>
  <div style="padding: 24px;">
    <h1>書本列表</h1>
    <a-list :data="bookList" bordered>
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

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const bookList = ref([])
    const router = useRouter()
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    const fetchBooks = async () => {
      const res = await axios.get(`${apiBaseUrl}/api/list-books`)
      bookList.value = res.data
    }

    const goToBook = (bookname) => {
      router.push(`/book/${encodeURIComponent(bookname)}`)
    }

    onMounted(fetchBooks)

    return { bookList, goToBook }
  }
}
</script>
