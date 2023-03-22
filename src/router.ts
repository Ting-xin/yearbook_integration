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
      component: () => import("./views/Statistics.vue"),
    },
    {
      path: "/staIntegre",
      name: "Statistics_Integration",
      component: () => import("./views/Statistics_Integration.vue"),
    },
    {
      path: "/spatial",
      name: "Spatial",
      component: () => import("./views/Spatial.vue"),
    },
    {
      path: "/spaIntegre",
      name: "Spatial",
      component: () => import("./views/Spatial_Integration.vue"),
    },
    {
      path: "/spaSta",
      name: "Spatialize",
      component: () => import("./views/Spatialize_Statistics.vue"),
    },
    {
      path: "/spaSta_operation",
      name: "Spatialize_operation",
      component: () => import("./views/Spatialize_Operation.vue"),
    },
    {
      path: "/help",
      name: "Help",
      component: () => import("./views/Statistics_Integration_copy.vue"),
    },
  ]
});

export default router;
