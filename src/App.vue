<template>
  <h5>자산관리로 부자되자 [{{selMenuItem.name}}]</h5>  
<nav class="navbar navbar-expand-lg navbar-light bg-light"><div class="dropdown">
</div>
  <div class="container-fluid">

  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button" id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false">
      {{selMenuItem.name}}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-for="(menuItem, idx) in menuItems" :key="idx" >
        <a class="dropdown-item" @click="selMenuItem = menuItem" href="#">{{menuItem.name}}</a>
      </li>
    </ul>
    </div>
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<!--    <img alt="Vue logo" src="./assets/logo.png" /> -->
  <HelloWorld msg="Welcome My Asset Portfolio" />
  <h3>개발자 : {{ developer }}</h3>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
export default {
  name: "App",
  data(){
    return {
      selMenuItem: {id:'menu_01', name:'자산현황'},
      menuItems: [
        {id:'menu_01', name:'자산현황'},
        {id:'menu_02', name:'부동산'},
        {id:'menu_03', name:'주식'},
        {id:'menu_04', name:'시스템'}
        ],
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
  margin-top: 10px;
}
</style>
