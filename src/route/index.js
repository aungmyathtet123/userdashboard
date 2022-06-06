import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import Userlist from '../page/Userlist';
import FrontendRegister from '../page/FrontendRegister';

Vue.use(VueRouter);
const routes=[
    {
        path:'/',
        name:'home',
        component:Home,
    },
    {
        path:'/login',
        name:'login',
        component:Login,
    },
    {
        path:'/register',
        name:'register',
        component:Register,
    },
    {
        path:'/userlist',
        name:'userlist',
        component:Userlist,
    },
    {
        path:'/userRegister',
        name:'frontendregister',
        component:FrontendRegister,
    },
];

const router=new VueRouter({
    mode:'history',
    routes,
});

export default router;
