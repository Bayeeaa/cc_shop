<template>
<div class="show">
    <div class="pic">
      <img :src="imaUrl(route.query.img)">
    </div>
    <div class="content">
        <div class="title">
          {{ route.query.name }}
        </div>
        <hr>
        <div class="avatar">
          卖家：<a>{{ route.query.seller }}</a>
        </div>
        <div class="detail">
          {{ route.query.des }}
        </div>
        <div class="price">
          价格：{{ route.query.price }}
        </div>
        <hr>
        <div class="buy">
          <a-button class="buy-button" @click="buy">立即购买</a-button>
        </div>
    </div>
</div>
<div >
  <a-comment v-for="com in Comment">
    <template #author><a>{{ com.user }}</a></template>
    <template #avatar>
      <a-avatar :size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </template>
    <template #content>
      <p>
        {{ com.content }}
      </p>
    </template>
  </a-comment>
  <a-comment>
    <template #author><a>{{ user.name }}</a></template>
    <template #avatar>
      <a-avatar :size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </template>
    <template #content>
      <p>
        <a-input></a-input>
      </p>
    </template>
  </a-comment>
  <a-button @click="release_comment">发表评论</a-button>
</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { user_state } from '@/stores/user'
import { message } from 'ant-design-vue';
import router from '../router';
import { UserOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

let route = useRoute()
const Comment = JSON.parse(route.query.comment); //解析json文件

const imaUrl = (url: string) => { //动态设置图片地址
  return new URL(`../assets/${url}`, import.meta.url).href
}

const user = user_state()

const buy = () => {
  if(user.name == '未注册' || user.name == '未登录'){
    message.error("您还未登录，请先登录！")
  }
  else{
    router.push('/buy')
  }
}

let display = ref(0)

const release_comment = () => {
  display = 1
}

</script>

<style scoped>
.show{
    height: 500px;
    width: 100%;
    background-color:rgb(233, 233, 233);
    padding: 50px;
    display: flex;
}

.pic{
    height: 400px;
    width: 400px;
    background-color: aquamarine;
    object-fit: cover;
}


.content{
    height: 400px;
    width: 600px;
    margin-left: 80px;
}

.title{
    height: 60px;
    width: 100%;
    font-size: 30px;
    font-weight: 400;
    
}

.detail{
    height: 200px;
    width: 100%;
    background-color: rgb(244, 244, 238);
    padding: 10px;
    border-radius: 10px;
}

.avatar{
  height: 50px;
  width: 100%;
  font-size: 20px;
}

.price{
  height: 50px;
  width: 100%;
  padding: 10px;
  font-size: 20px;
}

.buy{
    height: 50px;
    width: 100%;
    display: flex;
}

.buy-button{
    margin: auto;
    width: 150px;
    height: 50px;
}

img {
  width:100%;
  height:100%;
  object-fit: cover;
}
</style>