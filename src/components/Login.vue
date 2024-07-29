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
import { user_state } from '../stores/user'
import { reactive, UnwrapRef } from 'vue';
import { FormState } from '../utils/user_info';
import { message } from 'ant-design-vue';

const formState: UnwrapRef<FormState> = reactive({
  name: '',
  password:'',
});

const check_info = user_state()

const complete_info = () => {
    check_info.name = formState.name
}

const jump = () => {
    if(formState.name != check_info.flag && formState.password == check_info.password){
        message.error("输入用户名有误！")
    }
    else if(formState.name == check_info.flag && formState.password != check_info.password){
        message.error("输入密码有误！")
    }
    else if(formState.name != check_info.flag && formState.password != check_info.password){
        message.error("用户名和密码都存在错误！")
    }else{
        complete_info()
        message.success("登录成功")
        router.push('/')
    }
}

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