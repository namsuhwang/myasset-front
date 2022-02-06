import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';
import BankMain from './components/bank/BankMain.vue';
import BankDetail from './components/bank/BankDetail.vue';
import StockAcnoDetail from './components/stock/StockAcnoDetail.vue';
import StockKindDetail from './components/stock/StockKindDetail.vue';
import StockKindTotal from './components/stock/StockKindTotal.vue';
import StockTradeHistory from './components/stock/StockTradeHistory.vue';
import Login from './components/system/Login.vue';
import Logout from './components/system/Logout.vue';
import MemberReg from './components/system/MemberReg.vue';

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
  },
  {
    // 주식 거래 내역
    name: 'StockTradeHistory', path: "/asset/stock/trade/history", component: StockTradeHistory
  },
  {
    // 로그인
    name: 'Login', path: "/system/login", component: Login
  },
  {
    // 로그아웃
    name: 'Logout', path: "/system/logout", component: Logout
  },
  {
    // 회원가입
    name: 'MemberReg', path: "/system/memberReg", component: MemberReg
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