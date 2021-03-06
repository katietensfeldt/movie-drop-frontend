import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersIndex from "../views/users/Index.vue";
import UsersShow from "../views/users/Show.vue";
import FriendsIndex from "../views/friends/Index.vue";
import SuggestionsIndex from "../views/suggestions/Index.vue";
import MoviesIndex from "../views/movies/Index.vue";
import MoviesShow from "../views/movies/Show.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/users",
    name: "users-index",
    component: UsersIndex,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/friends",
    name: "friends-index",
    component: FriendsIndex,
  },
  {
    path: "/suggestions",
    name: "suggestions-index",
    component: SuggestionsIndex,
  },
  {
    path: "/movies",
    name: "movies-index",
    component: MoviesIndex,
  },
  {
    path: "/movies/:id",
    name: "movies-show",
    component: MoviesShow,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
