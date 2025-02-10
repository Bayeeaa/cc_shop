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
           path:'/cc_shop' ,
           component:Home,
        },
        {
            path:'/cc_shop/login' ,
            component:Login,            
        },
        {
            name:'xiangqing',
            path:'/cc_shop/detail',
            component:Detail,
            props:true,
        },
        {
            path:'/cc_shop/rank',
            component:Rank,
        },
        {
            path:'/cc_shop/user',
            component:User,
        },
        {
            path:'/cc_shop/buy',
            component:Buy,
        },
        {
            path:'/cc_shop/register',
            component:Register,
        }
    ]
})

//将router暴露出去(default 默认)
export default router