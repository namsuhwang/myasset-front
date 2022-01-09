import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';
import BankMain from './components/BankMain.vue';
import BankDetail from './components/BankDetail.vue';

const routes = [
  {
    path: "/asset/total", component: TotalAsset
  },
  {
    path: "/asset/bank", component: BankMain
  },
  {
    path: "/asset/bank/reg", component: BankDetail
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