<template>
  <h5>자산관리로 부자되자</h5>   
<!-- {{$process.env}} -->
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
      <!-- <a v-for="(subMenu, j) in selMenuItem.subMenus" :key="j" href="#" class="nav-item nav-link active">{{ subMenu.name }}</a> -->
      <router-link v-for="(subMenu, j) in selMenuItem.subMenus" :key="j" :to="subMenu.path"   class="nav-item nav-link active">{{ subMenu.name }}

      </router-link>
    </nav>
  </div>
  <hr>
  <div class="mt-4">
    <router-view /> 
  </div>  
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import menuItems from './assets/menu.js';
import axios from 'axios';

export default {
    name: "App",
    data() {
        return {
            menuItems: menuItems, 
            selMenuItem: menuItems[2], 
            developer: "황남수",
        };
    },
    methods: {
        restTestCallPost() {
            var callUrl = "/myasset/test/post";
            axios.post(callUrl, { param1: "3333" })
                .then((response) => {
                // 성공시 처리
                var data = response.data;
                alert(data);
            });
        },
        restTestCallGet() {
            var callUrl = "/myasset/test/get";
            axios.get(callUrl)
                .then((response) => {
                // 성공시 처리
                var data = response.data;
                alert(data);
            });
        }
    },
    created(){
        // 첫화면으로 주식 보유 현황 설정
        this.$router.push(menuItems[2].subMenus[0].path);
    },
    mounted() {
        this.$store.dispatch('StoreCommon/getCommonCodeInit');
    },
    components: { 
      // TotalAsset 
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
