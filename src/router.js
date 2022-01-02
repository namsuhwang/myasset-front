import { createWebHistory, createRouter } from "vue-router";
import TotalAsset from './components/TotalAsset.vue';

const routes = [
  {
    path: "/asset/total",
    component: TotalAsset,
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