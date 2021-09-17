import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "./views/Homepage.vue";
import Checkpage from "./views/Checkpage.vue";
import Historypage from "./views/Historypage.vue";
import Onhandmenu from "./views/menus/Onhandmenu.vue";
import Qrcodemenu from "./views/menus/Qrcodemenu.vue";
import Augmentmenu from "./views/menus/Augmentmenu.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Homepage,
    },
    {
      path: "/check",
      component: Checkpage,
    },
    {
      path: "/onhand",
      component: Onhandmenu,
    },
    {
      path: "/qrcode",
      component: Qrcodemenu,
    },
    {
      path: "/augment",
      component: Augmentmenu,
    },
    {
      path: "/history",
      component: Historypage,
    },
  ],
});

export default router;
