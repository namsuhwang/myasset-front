import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';
import BankMain from './components/BankMain.vue';
import BankDetail from './components/BankDetail.vue';
import StockAcnoDetail from './components/StockAcnoDetail.vue';
import StockKindDetail from './components/StockKindDetail.vue';

const routes = [
  {
    // 자산 종합 조회
    path: "/asset/total", component: TotalAsset
  },
  {
    path: "/asset/bank", component: BankMain
  },
  {
    // 은행 계좌 등록
    path: "/asset/bank/reg", component: BankDetail
  },
  {
    // 주식 계좌 등록
    path: "/asset/stock/acno/reg", component: StockAcnoDetail
  },
  {
    // 주식 종목 등록
    path: "/asset/stock/kind/reg", component: StockKindDetail
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