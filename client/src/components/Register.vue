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
import { message } from 'ant-design-vue';
import axios from 'axios';

const formState: UnwrapRef<FormState> = reactive({
  name: '',
  password:'',
});

const onSubmit = async () => {
  if (formState.name === '') {
    message.error('请填写用户名！');
  } else if (formState.password === '') {
    message.error('请填写密码！');
  } else {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name: formState.name,
        password: formState.password
      });

      message.success(response.data.message);
      router.push('/cc_shop/login');
    } catch (error) {
      message.error(error.response?.data?.message || '注册失败');
    }
  }
};


const back = () => {
  router.push('/')
}
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
</script>
  
  