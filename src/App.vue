<template>
  <div id="app">
    <math-equation></math-equation>
  </div>
</template>

<script>
import MathEquation from './components/MathEquation.vue'

export default {
  name: 'app',
  components: {
    MathEquation
  }
}
</script>

<style>
html,body,#app {
 width: 100%;
 height: 100%;
 margin: 0;
 padding: 0;
}
</style>
