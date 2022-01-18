import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';
import BankMain from './components/BankMain.vue';
import BankDetail from './components/BankDetail.vue';
import StockAcnoDetail from './components/StockAcnoDetail.vue';
import StockKindDetail from './components/StockKindDetail.vue';
import StockKindTotal from './components/StockKindTotal.vue';

const routes = [  
  {
    // 자산 종합 조회
    name: 'TotalAsset', path: "/asset/total", component: TotalAsset
  },
  {
    name: 'BankMain', path: "/asset/bank", component: BankMain
  },
  {
    // 은행 계좌 등록
    name: 'BankDetail', path: "/asset/bank/detail", component: BankDetail
  },
  {
    // 보유 주식
    name: 'StockKindTotal', path: "/asset/stock/total", component: StockKindTotal, props: true
  },
  {
    // 주식 계좌 등록
    name: 'StockAcnoDetail', path: "/asset/stock/acno/detail", component: StockAcnoDetail
  },
  {
    // 주식 종목 등록
    name: 'StockKindDetail', path: "/asset/stock/kind/detail", component: StockKindDetail
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