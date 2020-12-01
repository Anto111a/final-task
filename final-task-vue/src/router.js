import Vue from "vue";
import VueRouter from "vue-router";
import CompaniesList from "./components/CompaniesList";
import Company from './views/Company';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/home/:aaa",
    name: "Company",
    component: Company,
    props: true,
  },
  {
    path: "/companies",
    name: "Companies",
    component: CompaniesList

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./views/Profile.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/BoardUser.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
