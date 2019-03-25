<template>
  <div id="app">
    <eleEasyTableDemo />
  </div>
</template>

<script>
import eleEasyTableDemo from './components/ele-easy-table-demo.vue'

export default {
  name: 'app',
  components: {
    eleEasyTableDemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
