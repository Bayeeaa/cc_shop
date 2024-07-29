import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import router from './router';

const pinia = createPinia()//创建pinia实例
const app = createApp(App);//创建根实例

app.use(pinia) //使用pinia插件
app.use(Antd) //使用ant插件
app.use(router) //使用router
app.mount('#app') //挂载应用到app上
