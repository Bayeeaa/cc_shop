<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="用户名">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="back">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import router from '../router';
import { FormState } from '../utils/user_info'
import { user_state } from '../stores/user'
import { message } from 'ant-design-vue';

const formState: UnwrapRef<FormState> = reactive({
  name: '',
  password:'',
});

const user_set = user_state() //使用pinia让数据可以全局控制
const set_data = () => {
  user_set.name = '未登录'
  user_set.flag = formState.name
  user_set.password = formState.password
}

const onSubmit = () => {
  if(formState.name == ''){
    message.error("请填写用户名！")
  }
  else if(formState.password == ''){
    message.error("请填写密码！")
  }
  else{
    set_data()
    message.success("注册成功")
    router.push('/login')    
  }
};

const back = () => {
  router.push('/')
}
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
</script>
  
  