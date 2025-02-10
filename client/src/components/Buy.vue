<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="收货地址">
      <a-input v-model:value="formState.loc" />
    </a-form-item>
    <a-form-item label="数量">
      <a-input v-model:value="formState.count" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">购买</a-button>
      <a-button style="margin-left: 10px" @click="back">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import router from '../router';
import { shopdata } from '../utils/shop_info';

const formState: UnwrapRef<shopdata> = reactive({
  loc: '',
  count: '',
});
const onSubmit = () => {
  if(formState.loc == ""){
    message.error('请填写收货地址！');
  }
  else if(formState.count == ""){
    message.error('请填写购买数量！');
  }
  else{
    message.success('购买成功');
    router.push('/')
  }
};
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const back = () => { //返回上一级
  router.go(-1)
}

</script>
  
  