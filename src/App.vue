<template>
<!--    <img alt="Vue logo" src="./assets/logo.png" /> -->
  <HelloWorld msg="Welcome My Asset Portfolio" />
  <h3>개발자 : {{ developer }}</h3>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  data(){
    return {
      developer: "황남수"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
