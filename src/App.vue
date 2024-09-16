<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img src="./assets/logo.jpg" alt="">
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <RouterLink to="/cc_shop"> 首页 </RouterLink>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <RouterLink to="/rank">  性价比排行榜 </RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      
      <a-layout-header style="background: #ffffff; padding: 0;" >
        <div style="float: right; padding-right: 20px;">
          <RouterLink to="/user">
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
              {{ user.name }}
          </RouterLink>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 12px">
        <a-breadcrumb style="margin: 10px 0">
        </a-breadcrumb>
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
import {
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { user_state } from './stores/user'
import { UserOutlined } from '@ant-design/icons-vue'

const user = user_state()
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

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

.logo{
  background-color: rgb(255, 255, 255);
  height: 60px;
}

img {   /* 防止图片挤压，图片居中显示，多余的会被裁剪 */
  width:100%;
  height:100%;
  object-fit: cover; 
}
</style>