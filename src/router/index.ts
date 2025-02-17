import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import ShowDetailView from "@/views/ShowDetailView.vue";
import GenreView from "@/views/GenreView.vue";
import SearchView from "@/views/SearchView.vue";

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
    component: ShowDetailView,
    props: true,
  },
  {
    path: "/shows/genre/:genre",
    name: "GenreView",
    component: GenreView,
    props: true,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
