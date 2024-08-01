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
  <a-comment v-if="display == 1">
    <template #author><a>{{ user.name }}</a></template>
    <template #avatar>
      <a-avatar :size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </template>
    <template #content v-if="display == 1">
        <a-input v-model:value="comment_content"></a-input>
    </template>
  </a-comment>
  <a-comment v-if="display == 0 && comment_input==1">
    <template #author><a>{{ user.name }}</a></template>
    <template #avatar>
      <a-avatar :size="small">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </template>
    <template #content>
      {{ comment_content }}
    </template>
  </a-comment>
  <a-button v-if="display == 0 && comment_input == 0" @click="release_comment">发表评论</a-button>
  <a-button v-if="display == 1" @click="comfirm">确认</a-button>
  <a-button v-if="display == 1" @click="cancel">取消</a-button>
  <a-button v-if="display == 0 && comment_input == 1" @click="edit">编辑</a-button>
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

let comment_content = ref('')
let display = ref(0)
let comment_input = ref(0)

const release_comment = () => {
  if(user.name == '未注册' || user.name == '未登录'){
    message.error("您还未登录，请先登录！")
  }
  else display.value = 1
}

const comfirm = () => {
  if(comment_content.value == ''){
    message.error("请输入内容！")
  }
  else{
    comment_input.value = 1
    display.value = 0
    message.success("发表成功！")
  }
}

const cancel = () => {
  display.value = 0
}

const edit = () => {
  display.value = 1
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