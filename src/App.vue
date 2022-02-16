<template>
  <h5>자산관리로 부자되자{{ phase }}</h5>   
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
      </ul>&nbsp;&nbsp;
      <!-- <router-link v-for="(subMenu, j) in selMenuItem.subMenus" :key="j" :to="subMenu.path"   class="nav-item nav-link active">{{ subMenu.name }} -->
      <router-link v-for="(subMenu, j) in selMenuItem.subMenus" :key="j" :to="subMenu.path" class="">{{ subMenu.name }}

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
// import storeAuth from '@/store/modules/storeAuth'

export default {
    name: "App",
    data() {
        return {
            phase: '',
            menuItems: menuItems, 
            selMenuItem: menuItems[2], 
            developer: "황남수",
        };
    },
    methods: {
    },
    created(){
        this.$sessionInfoLog("app.vue");
        if(process.env.VUE_APP_PHASE == 'DEV'){
            this.phase = ' [개발]';
        }

        this.$store.dispatch('storeCommon/getCommonCodeInit');
        
        if(this.$store.state.storeAuth.token == null || this.$store.state.storeAuth.token == 'null' || this.$store.state.storeAuth.token == 'undefined'){
            this.$router.push({name : "Login"}, );
        }else{
            // 첫화면으로 주식 보유 현황 설정
            this.$router.push({name : "StockKindTotal"}, );
        }        
    },
    mounted() {
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
