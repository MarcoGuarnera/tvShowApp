import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Dashboard from "@/views/dashboard/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/shows",
  },
  {
    path: "/shows",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/shows/:id",
    name: "ShowDetail",
    component: () => import("@/views/ShowDetailView.vue"),
    props: true,
  },
  {
    path: "/shows/genre/:genre",
    name: "GenreView",
    component: () => import("@/views/GenreView.vue"),
    props: true,
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/SearchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
