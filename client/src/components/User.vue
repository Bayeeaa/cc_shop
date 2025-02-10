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
import { User_info } from '../utils/user_info'
import router from '../router';
import { watch } from 'vue';

onMounted(() => {
  refresh_Formdata()
  getCurrentUser()
})

// const user = user_state()
const user_infomation = user_info()

// const register = () => {
//   if(user.name == '未注册' && user.password == ''){
//     router.push('/cc_shop/register')
//   }
// }

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      message.error("请先登录！");
      return;
    }

    const response = await axios.get('http://localhost:3000/currentUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // 将当前用户的用户名存储到状态
    const username = response.data.username;
    console.log('当前用户名:', username);
    // 在界面上显示用户名
  } catch (error) {
    message.error("获取用户名失败");
  }
};

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

// const refresh_Formdata = () => {
//   formState.sex = user_infomation.sex
//   formState.birth = user_infomation.birth
//   formState.infomation = user_infomation.infomation
// }

const display = ref(1) //这里使用简单的let作变量不信，用ref响应式后就可以弹出使v-if进行

const set_info = () => {
  display.value = 0
}

const comfirm = async () => {
  display.value = 1;
  set_user_infomation();

  const token = localStorage.getItem('token');
  if (!token) {
    message.error('请先登录！');
    return;
  }

  try {
    await axios.put('http://localhost:3000/updateUserInfo', {
      sex: formState.sex,
      birth: formState.birth,
      infomation: formState.infomation
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    message.success('编辑成功');
  } catch (error) {
    message.error('更新用户信息失败');
  }
};

const cancel = () => {
  display.value = 1
}
</script>
<style scoped>

</style>