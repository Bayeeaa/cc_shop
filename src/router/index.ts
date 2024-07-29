//路由配置
import { createRouter, createWebHistory } from "vue-router";
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Detail from '@/components/Detail.vue'
import Rank from '@/components/Rank.vue'
import User from '@/components/User.vue'
import Buy from '@/components/Buy.vue'
import Register from '@/components/Register.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
           path:'/' ,
           component:Home,
        },
        {
            path:'/login' ,
            component:Login,            
        },
        {
            name:'xiangqing',
            path:'/detail',
            component:Detail,
            props:true,
        },
        {
            path:'/rank',
            component:Rank,
        },
        {
            path:'/user',
            component:User,
        },
        {
            path:'/buy',
            component:Buy,
        },
        {
            path:'/register',
            component:Register,
        }
    ]
})

//将router暴露出去(default 默认)
export default router