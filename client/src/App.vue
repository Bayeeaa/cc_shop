<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img src="./assets/logo.jpg" alt="">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <RouterLink to="/cc_shop/"> 首页 </RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <RouterLink to="/rank"> 性价比排行榜 </RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #ffffff; padding: 0;">
        <div style="float: right; padding-right: 20px;">
          <div v-if="user.name==''">
            <RouterLink to="/cc_shop/login">
              <a-avatar>
                <template #icon><UserOutlined /></template>
              </a-avatar>
              {{ user.name }}
            </RouterLink>          
          </div>
          <div v-else>
            <RouterLink to="/cc_shop/user">
              <a-avatar>
                <template #icon><UserOutlined /></template>
              </a-avatar>
              {{ user.name }}
            </RouterLink>   
          </div>

        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 12px">
        <a-breadcrumb style="margin: 10px 0"></a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '1000px' }">
          <RouterView></RouterView>         
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Created by ye
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { PieChartOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { message } from 'ant-design-vue';
import axios from 'axios';

const user = ref<{ name: string }>({ name: '' }); // 使用 ref 来使 user 变成响应式对象
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

const show_username = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      user.value.name = '登入';      
      return;
    }

    const response = await axios.get('http://localhost:3000/currentUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // 将当前用户的用户名存储到 user 变量中
    user.value.name = response.data.username;
    console.log('当前用户名:', user.value.name); // 输出当前用户名
    
    
  } catch (error) {
    message.error("获取用户名失败");
  }
};

onMounted(() => {
  show_username(); // 组件挂载时调用该函数来显示用户名
});
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.logo {
  background-color: rgb(255, 255, 255);
  height: 60px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
</style>
