<template>
  <section>
    <h2>一般計算</h2>
    <input v-model="expression" type="text" size="50" placeholder="輸入算式，如 sin(30) + 5 * 2" />
    <label>
      模式:
      <select v-model="angleMode">
        <option value="deg">角度</option>
        <option value="rad">弧度</option>
      </select>
    </label>
    <button @click="calculate">計算</button>
    <div>{{ result }}</div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE  // 從 .env 拿到 https://calculator-gj6q.onrender.com

const expression = ref('')
const angleMode = ref('deg')
const result = ref('')

const calculate = async () => {
  result.value = '計算中…'
  // 在這裡改寫 URL：
  // 開發環境 DEV 時會走 Vite proxy -> /calculate
  // 生產環境 build 後則自動向 VITE_API_BASE/calculate 發請求
  const url = import.meta.env.DEV
    ? '/api/calculate'
    : `${API_BASE}/calculate`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expression: expression.value,
        angle_mode: angleMode.value,
      }),
    })
    const data = await res.json()
    if (data.error) {
      result.value = '錯誤: ' + data.error
    } else {
      result.value = '結果: ' + data.result
    }
  } catch (err) {
    result.value = '伺服器連線失敗: ' + err
  }
}
</script>