<template>
  <div class="app">
    <h1>工程計算機</h1>
    
    <GeneralCalculator />
    <hr />
    <FunctionPlotter />
  </div>
</template>

<script setup>
import GeneralCalculator from '../components/GeneralCalculator.vue'
import FunctionPlotter from '../components/FunctionPlotter.vue'
</script>

<style>
body {
  font-family: sans-serif;
  padding: 20px;
  font-size: 30px;
  margin: 5px;
}

input, button, select {
  margin: 5px;
  height: 30px;
}

.error {
  color: red;
}

#plot {
  width: 100%;
  height: 600px;
}
</style>