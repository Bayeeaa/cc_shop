<template>
  <a-descriptions title="用户信息" bordered>
    <a-descriptions-item label="名字">{{ user.name }}</a-descriptions-item>
    
    <a-descriptions-item label="性别" v-if="display == 1">{{ user_infomation.sex }}</a-descriptions-item>
    <a-descriptions-item label="生日" v-if="display == 1">{{ user_infomation.birth }}</a-descriptions-item>
    <a-descriptions-item label="个人简介" :span="3" v-if="display == 1">{{ user_infomation.infomation }}</a-descriptions-item>
    <a-descriptions-item label="性别" v-if="display == 0">
      <a-input v-model:value="formState.sex"></a-input>
    </a-descriptions-item>
    <a-descriptions-item label="生日" v-if="display == 0">
      <a-input v-model:value="formState.birth"></a-input>
    </a-descriptions-item>
    <a-descriptions-item label="个人简介" :span="3" v-if="display == 0">
      <a-input v-model:value="formState.infomation"></a-input>
    </a-descriptions-item>
  </a-descriptions>
  <div style=" width: 100%; height: 50px; display: flex;">
    <a-button style="margin: 20px auto;" @click="set_info" v-if="display == 1">编辑信息</a-button>
    <a-button style="margin: 20px auto;" @click="comfirm" v-if="display == 0">确定</a-button>
    <a-button style="margin: 20px auto;" @click="cancel" v-if="display == 0">取消</a-button>
  </div>
  
</template>
<script lang="ts" setup>
import { onMounted, UnwrapRef, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { user_state } from '../stores/user'
import { User_info } from '../utils/user_info'
import router from '../router';
import { watch } from 'vue';
import { user_info } from '../stores/user'

onMounted(() => {
  register()
  refresh_Formdata()
})

const user = user_state()
const user_infomation = user_info()

const register = () => {
  if(user.name == '未注册' && user.password == ''){
    router.push('/register')
  }
}

const formState: UnwrapRef<User_info> = reactive({
  sex:'未填写',
  birth:'未填写',
  infomation:'这个人很神秘~',
});

watch( //监控sex的数据改变
  () => formState.sex,
  (newValue, oldValue) => {
    console.log(`sex changed from ${oldValue} to ${newValue}`);
  }
);

const set_user_infomation = () => {
  user_infomation.sex = formState.sex
  user_infomation.birth = formState.birth
  user_infomation.infomation = formState.infomation
}

const refresh_Formdata = () => {
  formState.sex = user_infomation.sex
  formState.birth = user_infomation.birth
  formState.infomation = user_infomation.infomation
}

const display = ref(1) //这里使用简单的let作变量不信，用ref响应式后就可以弹出使v-if进行

const set_info = () => {
  display.value = 0
}

const comfirm = () => {
  display.value = 1
  set_user_infomation()
  message.success("编辑成功")
}

const cancel = () => {
  display.value = 1
}
</script>
<style scoped>

</style>