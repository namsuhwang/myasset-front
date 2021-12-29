<template>
  <h5>자산관리로 부자되자 [{{selMenuItem.name}}]</h5>   

  <div class="container-fluid">
    <nav class="nav">
      <a class="nav-link dropdown-toggle ms_menulabel" style="color:white" href="#" id="navbarDropdownMenuLink" role="button"  data-bs-toggle="dropdown" aria-expanded="false">
      {{selMenuItem.name}}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li v-for="(menuItem, i) in menuItems" :key="i" >
          <a class="dropdown-item" @click="selMenuItem = menuItem" href="#">{{menuItem.name}}</a>
        </li>
      </ul>
      <a v-for="(subMenu, j) in selMenuItem.subMenus" :key="j" href="#" class="nav-item nav-link active">{{ subMenu.name }}</a>
    </nav>
  </div>
  
  <button @click="restTestCallGet()">Get Test</button>
  <button @click="restTestCallPost()">Post Test</button>
</template>

<script>
import menuItems from './assets/menu.js';
import axios from 'axios';

// axios.defaults.baseURL = 'http://namsuhwang.synology.me:8090/myasset';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  name: "App",
  data(){
    return {
      selMenuItem: menuItems[0],
      menuItems: menuItems,
      subItems: menuItems[0].subMenus,
      developer: "황남수"
    }
  },
  methods: {
    restTestCallPost(){

      // alert("1");
      var callUrl = "/myasset/test/post";
      //alert(callUrl);
      axios.post(callUrl, {param1:"3333"})
            .then((response)=>{
              // 성공시 처리
              var data = response.data;
              alert(data);
            }) ;

      //alert(callUrl);
    },

    restTestCallGet(){

      // alert("1");
      var callUrl = "/myasset/test/get";
      //alert(callUrl);
      axios.get(callUrl)
            .then((response)=>{
              // 성공시 처리
              var data = response.data;
              alert(data);
            }) ;

      //alert(callUrl);
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
.ms_menulabel {
  background-color: darkslateblue; 
  border-radius: 10px;
} 
</style>
