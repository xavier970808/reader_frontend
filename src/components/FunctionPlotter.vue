<template>
  <section>
    <h2>函數繪圖</h2>

    <label>
      函數（用逗號分隔）:
      <input v-model="funs" size="40" />
    </label><br />

    <label>
      X 起點:
      <input v-model.number="x0" type="number" />
    </label>
    <label>
      X 終點:
      <input v-model.number="x1" type="number" />
    </label><br />

    <label>
      積分起點:
      <input v-model.number="i0" type="number" />
    </label>
    <label>
      積分終點:
      <input v-model.number="i1" type="number" />
    </label><br />

    <label>
      模式:
      <select v-model="mode">
        <option value="deg">角度</option>
        <option value="rad">弧度</option>
      </select>
    </label><br />

    <label>
      <input type="checkbox" v-model="showDer" />
      顯示導數
    </label>
    <label>
      <input type="checkbox" v-model="showPts" />
      標示交點 / 極值
    </label><br />

    <button @click="draw">繪圖</button>
    <div class="error">{{ err }}</div>

    <h3>定積分結果</h3>
    <div id="integrals"></div>
    <div id="plot"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Plotly from 'plotly.js-dist-min'

const api = import.meta.env.VITE_API_BASE // 後端 API 網址

// Reactive state
const funs = ref('sin(x), cos(x)') // 使用者輸入函數串
const x0 = ref(-360)     // X 軸起點
const x1 = ref(360)      // X 軸終點
const i0 = ref(0)        // 積分起點
const i1 = ref(180)      // 積分終點
const mode = ref('deg')  // 角度 (deg) 或弧度 (rad)
const showDer = ref(false) // 是否顯示導數
const showPts = ref(false) // 是否顯示交點/極值
const err = ref('')       // 錯誤訊息顯示

//繪圖
const draw = async () => {
  err.value = ''
  // 清空先前結果
  document.getElementById('integrals').innerHTML = ''
  Plotly.purge('plot')

  const payload = {
    functions: funs.value,
    x_start: x0.value,
    x_end: x1.value,
    int_start: i0.value,
    int_end: i1.value,
    angle_mode: mode.value,
    show_derivative: showDer.value,
    show_points: showPts.value,
  }

  try {
    const res = await fetch(`${api}/plot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (data.error) {
      err.value = '錯誤: ' + data.error
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
  } catch (e) {
    err.value = '伺服器連線錯誤: ' + e
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
