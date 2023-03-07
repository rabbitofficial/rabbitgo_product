import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContentView from "../views/ContentView.vue";
import DetailViewVue from "@/views/DetailView.vue";
import QuizView from "@/views/QuizView.vue";
import CongratsView from "@/views/CongratsView.vue";
import TryView from "@/views/TryView.vue";
import DoneView from "@/views/DoneView.vue";
import MainView from "@/views/MainView.vue";
import ConnectView from "@/views/ConnectView.vue";
import LearnHomeView from "@/views/LearnHomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
    {
      path: "/",
      name: "learnhome",
      component: LearnHomeView,
    },
    {
      path: "/connect",
      name: "connect",
      component: ConnectView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/content:obj",
      name: "content",
      component: ContentView,
    },
    {
      path: "/detail:obj",
      name: "detail",
      component: DetailViewVue,
    },
    {
      path: "/quiz:obj",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/congrats",
      name: "congrats",
      component: CongratsView,
    },
    {
      path: "/try",
      name: "try",
      component: TryView,
    },
    {
      path: "/done",
      name: "done",
      component: DoneView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
