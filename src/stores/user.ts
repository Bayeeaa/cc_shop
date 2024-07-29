import { defineStore } from 'pinia';

export const user_state = defineStore('user', {
  state: () => ({
    name: '未注册',
    password: '',
    flag:''
  }),
  actions: { //改变state的方法
    setUserInfo(name:string,password:string,flag:string) {
        this.name = name
        this.password = password
        this.flag = flag
    }
  }
});

export const rank_data = defineStore('rank',{
  state: () => ({
    count_arry:[0,0,0,0,0,0,0,0]
  }),
  actions: {
    count_add(id:number,){
      this.count_arry[id]++
    }
  }
})

export const user_info = defineStore('info', {
  state:() => ({
    sex:'未填写',
    birth:'未填写',
    infomation:'这个人很神秘~',
  }),
  actions: {
    set_userinfo(sex:string,birth:string,infomation:string){
      this.sex = sex
      this.birth = birth
      this.infomation = infomation
    }
  }
})