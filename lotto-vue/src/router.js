import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import Check from "./views/Check";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/",
      component: Home
    },
    {
      path: "/check",
      component: Check
    }
  ]
});

export default router; 