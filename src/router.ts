import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/division",
      name: "Home",
      component: () => import("./views/Division.vue"),
    },
    {
      path: "/help",
      name: "help",
      component: () => import("./components/BasicMap.vue"),
    },
  ]
});

export default router;
