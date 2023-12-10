import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path : "/",
            // name : "home",
            component : Home
        },
        // {
        //     path : "/catalogue",
        //     // name : "todo",
        //     component : Catalogue
        // },{
        //     path : "/dashboard",
        //     component : Dashboard
        // },{
        //     path : "/login",
        //     component : Login
        // }
    ],
})


export default router;