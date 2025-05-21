<template>
  <section>
    <h2>函數繪圖</h2>

    <label>
      函數（用逗號分隔）:
      <input v-model="functions" size="40" />
    </label><br />

    <label>
      X 起點:
      <input v-model.number="xStart" type="number" />
    </label>
    <label>
      X 終點:
      <input v-model.number="xEnd" type="number" />
    </label><br />

    <label>
      積分起點:
      <input v-model.number="intStart" type="number" />
    </label>
    <label>
      積分終點:
      <input v-model.number="intEnd" type="number" />
    </label><br />

    <label>
      模式:
      <select v-model="angleMode">
        <option value="deg">角度</option>
        <option value="rad">弧度</option>
      </select>
    </label><br />

    <label>
      <input type="checkbox" v-model="showDerivative" />
      顯示導數
    </label>
    <label>
      <input type="checkbox" v-model="showPoints" />
      標示交點 / 極值
    </label><br />

    <button @click="plot">繪圖</button>
    <div class="error">{{ error }}</div>

    <h3>定積分結果</h3>
    <div id="integrals"></div>
    <div id="plot"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Plotly from 'plotly.js-dist-min'

const API_BASE = import.meta.env.VITE_API_BASE

// Reactive state
const functions = ref('sin(x), cos(x)')
const xStart = ref(-360)
const xEnd = ref(360)
const intStart = ref(0)
const intEnd = ref(180)
const angleMode = ref('deg')
const showDerivative = ref(false)
const showPoints = ref(false)
const error = ref('')

// 主繪圖函式
const plot = async () => {
  error.value = ''
  // 清空先前結果
  document.getElementById('integrals').innerHTML = ''
  Plotly.purge('plot')

  const payload = {
    functions: functions.value,
    x_start: xStart.value,
    x_end: xEnd.value,
    int_start: intStart.value,
    int_end: intEnd.value,
    angle_mode: angleMode.value,
    show_derivative: showDerivative.value,
    show_points: showPoints.value
  }

  try {
    const res = await fetch(`${API_BASE}/plot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (data.error) {
      error.value = '錯誤: ' + data.error
      return
    }

    // 繪製圖形
    Plotly.newPlot('plot', data.traces, { margin: { t: 30 } })

    // 顯示定積分結果
    if (data.integrals && data.integrals.length) {
      data.integrals.forEach(item => {
        const div = document.createElement('div')
        div.textContent = `∫ ${item.expr} dx = ${item.value}`
        document.getElementById('integrals').appendChild(div)
      })
    }
  } catch (err) {
    error.value = '伺服器連線錯誤: ' + err
  }
}
</script>

<style scoped>
.error {
  color: red;
}
#plot {
  width: 100%;
  height: 600px;
}
</style>
