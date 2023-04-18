import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "join",
    component: function () {
      return import("../views/JoinView.vue");
    },
    meta: { authRequired: true },
    props: true,
  },
  {
    path: "/chat/:roomId",
    name: "chat",
    component: function () {
      return import("../views/ChatView.vue");
    },
    props: true,
  },

  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../views/LoginView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.authRequired;
    })
  ) {
    let isAuth = localStorage.getItem("token");
    if (isAuth) {
      next(); // 페이지 전환
    } else {
      next("/login");
    }
  } else {
    next(); // 페이지 전환
  }
});

export default router;
