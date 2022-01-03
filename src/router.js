import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';
import BankMain from './components/BankMain.vue';

const routes = [
  {
    path: "/asset/total", component: TotalAsset
  },
  {
    path: "/asset/bank", component: BankMain
  }

  // 404 Not Found
  /*
  {
      path: "/:anything(.*)",
      component: 404,
  }
  */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 