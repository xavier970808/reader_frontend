<template>
  <section>
    <h2>一般計算</h2>
    <input
      v-model="expr"
      type="text"
      size="50"
      placeholder="輸入算式，如 sin(30) + 5 * 2"
    />
    <label>
      模式:
      <select v-model="mode">
        <option value="deg">角度</option>
        <option value="rad">弧度</option>
      </select>
    </label>
    <button @click="calc">計算</button>
    <div>{{ ans }}</div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 後端計算機 API 基本網址
const api = import.meta.env.VITE_API_BASE 

const expr = ref('') // 使用者輸入算式
const mode = ref('deg') // 角度或弧度模式
const ans = ref('') // 顯示計算結果或錯誤訊息

// 執行計算
const calc = async () => {
  ans.value = '計算中…'
  // DEV 環境走 Vite proxy -> /api/calculate；生產環境則用實際 URL
  const url = import.meta.env.DEV ? '/api/calculate' : `${api}/calculate`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expression: expr.value,
        angle_mode: mode.value,
      }),
    })
    const data = await res.json()
    if (data.error) {
      ans.value = '錯誤: ' + data.error
    } else {
      ans.value = '結果: ' + data.result
    }
  } catch (err) {
    ans.value = '伺服器連線失敗: ' + err
  }
}
</script>
