import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/user",
    component: HomeView,
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("../views/UserView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token) {
    if (to.path == "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
      
    }
  }
});

export default router;
