import { createRouter, createWebHistory } from "vue-router";
import Restaurant from "../views/Restaurant.vue";
const routes = [
    {
        path: "/",
        name: "Restaurants Map",
        component: Restaurant,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
