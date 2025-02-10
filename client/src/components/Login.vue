<template>
    <div class="login">
        <h2 style="margin-left: 175px;">登录</h2>
        <div class="login_content">
            <div>
            用户名：<a-input v-model:value="formState.name" />  
            </div>
            <br>
            <div>
            密码：<a-input v-model:value="formState.password" />
            </div>
        </div>
        <button class="bn" @click="jump()">登录</button>
        <button class="bn1" @click="register()">注册</button>
    </div>
</template>
<script lang="ts" setup>
import router from '../router';
import { reactive, UnwrapRef } from 'vue';
import { FormState } from '../utils/user_info';
import { message } from 'ant-design-vue';
import axios from 'axios';

const formState: UnwrapRef<FormState> = reactive({
  name: '',
  password:'',
});

const jump = async () => {
    if (formState.name === '' || formState.password === '') {
        message.error("请输入用户名和密码");
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/login', {
            name: formState.name,
            password: formState.password
        });

        // 获取到的 token 可以保存在 localStorage 或 sessionStorage 中
        localStorage.setItem('token', response.data.token);

        message.success("登录成功");
        router.push('/cc_shop/'); // 登录成功后跳转到主页
    } catch (error) {
        if (error.response) {
            message.error(error.response.data.message); // 错误信息来自后端
        } else {
            message.error("登录失败");
        }
    }
};

const register = () => {
    router.push('/register')
}
</script>
<style scoped>
    .login{
        background-color: beige;
        width: 400px;
        height: 250px;
        margin: auto;
        position: absolute;
        top:0;
        right:0;
        bottom:0;
        left:0;
        border:0.8px solid black;
    }

    .login_content{
        width: 280px;
        margin-left: 60px;
        margin-top: 40px;
        padding-left: 20px;
    }

    .bn{
        margin-left: 120px;
        margin-top: 30px;
        width: 60px;
        height: 30px;
    }

    .bn1{
        margin-left: 50px;
        margin-top: 30px;
        width: 60px;
        height: 30px;
    }
</style>