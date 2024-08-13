<template>
    <div class="content">
        <div class="title">
            <div>性价比排行</div>
        </div>
        <div class="rank">
            <a-list size="large" bordered :data-source="sortedData">
                <template #renderItem="{ item }">
                    <a-list-item>{{ item.name }}</a-list-item>
                </template>
            </a-list>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'    
import { rank_data } from '@/stores/user'

const datashop = ref([
  {
    name:'手工DIY收纳册',
    id:'1',
    img:'diy.avif',
    des:'可以收集叶片进行展示，可以记录很多信息。',
    seller:'500c',
    comment:[
      {
        user:'mawen',
        content:'good',
      },
      {
        user:'manbo',
        content:'很好，孩子很喜欢吃！',
      }
    ],
    price:'30',
    count:0,
  },
  {
    name:'收纳筐',
    id:'2',
    img:'collect.avif',
    des:'可以收纳很多东西，方便储存利用，帮你减轻负担。',
    seller:'ye',
    comment:[{
      user:'shipship',
      content:'便宜而且好用！'
    }],
    price:'20',
    count:0,
  },
  {
    name:'夏日凉枕',
    id:'3',
    img:'pillow.avif',
    des:'',
    seller:'',
    comment:'',
    price:'60',
    count:0,
  },
  {
    name:'办公椅',
    id:'4',
    img:'chair.avif',
    des:'',
    seller:'',
    comment:'',
    price:'200',
    count:0,
  },
  {
    name:'陶瓷杯子',
    id:'5',
    img:'cup.avif',
    des:'',
    seller:'',
    comment:'',
    price:'40',
    count:0,
  },
  {
    name:'夏威夷风裤',
    id:'6',
    img:'pants.avif',
    des:'',
    seller:'',
    comment:'',
    price:'99',
    count:0,
  },
  {
    name:'水杯',
    id:'7',
    img:'bottle.avif',
    des:'',
    seller:'',
    comment:'',
    price:'50',
    count:0,
  },
  {
    name:'帆布包',
    id:'8',
    img:'bag.avif',
    des:'',
    seller:'',
    comment:'',
    price:'60',
    count:0,
  }
])

const rank = rank_data()

const set_count = () => { //点击数占0.4，评论数占0.6
    for(let i=0;i<datashop.value.length;i++){
        datashop.value[i].count = rank.count_arry[i] * 0.4 + datashop.value[i].comment.length * 0.6 || 0
    }
}

onMounted(() => {
  set_count();
});

const sortedData = computed(() => {  //根据set_count后的数据进行排序
  return [...datashop.value].sort((a, b) => Number(b.count) - Number(a.count));
});

</script>
<style scoped>
.content{
    background-color: rgb(248, 245, 241);
    width: 500px;
    height: 900px;
    margin: auto;
}
.title{
    height: 90px;
    background-color: rgb(238, 236, 236);
    padding: 20px 140px;
    font-size: 40px;
}
</style>