import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/management",
    component: HomeView,
    children: [
      {
        path: "/management",
        name: "management",
        component: () => import("../views/ManagementView.vue"),
        meta:{
          title:'商品管理'
        }
      },
      {
        path: "/card",
        name: "card",
        component: () => import("../views/CardView.vue"),
        meta:{
          title:'购物车列表'
        }
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/GoodsView.vue"),
        meta:{
          title:'商品列表'
        }
      },
    ],
  },
  {
    path: "/login",
    name: "login",
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
