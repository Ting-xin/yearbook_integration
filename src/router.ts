import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/division",
      name: "Division",
      component: () => import("./views/Division.vue"),
    },
    {
      path: "/grid",
      name: "Grid",
      component: () => import("./views/Grid.vue"),
    },
    {
      path: "/help",
      name: "help",
      component: () => import("./components/BasicMap.vue"),
    },
  ]
});

export default router;
