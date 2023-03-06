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
      path: "/statistics",
      name: "Statistics",
      component: () => import("./views/Statistics_Integration.vue"),
    },
    {
      path: "/Spatial",
      name: "Spatial",
      component: () => import("./views/Spatial_Integration.vue"),
    },
    {
      path: "/Spatial",
      name: "Spatialize",
      component: () => import("./views/Spatialize_Statistics.vue"),
    },
    {
      path: "/help",
      name: "Help",
      component: () => import("./views/Help.vue"),
    },
  ]
});

export default router;
