<template>
  <a-carousel arrows autoplay>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    
    <div v-for="shops in datashop">
      <RouterLink :to="{
        // path:'/detail',
        name:'xiangqing',
        query:{
          name:shops.name,
          des:shops.des,
          seller:shops.seller,
          comment:JSON.stringify(shops.comment),
          img:shops.img,
          price:shops.price
        }
      }">
        <div class="carousel_img">
          <img :src="imaUrl(shops.img)">
        </div>
      </RouterLink>
    </div>
  </a-carousel>
  <br>
  <a-button @click="display_hot" v-if="d_hot == 1">按热度排序↓↓↓</a-button>
  <a-button @click="display_default" v-if="d_hot == 0">按默认排序↓↓↓</a-button>
  <a-row :gutter="16" v-if="d_hot == 1">
    <a-col class="gutter-row" :span="6" v-for="shops in datashop" >
      <RouterLink :to="{
        // path:'/detail',
        name:'xiangqing',
        query:{
          name:shops.name,
          des:shops.des,
          seller:shops.seller,
          comment:JSON.stringify(shops.comment),//这里是数组对象，不能直接传递字符串，因此要转成json文件
          img:shops.img,
          price:shops.price
        }
      }" @click="count(shops)">
        <div class="gutter-box">
          <div class="img_pos">
            <img :src="imaUrl(shops.img)">
          </div>
          <div class="shops_name">
            {{ shops.name }}
          </div>
        </div>
      </RouterLink>  
    </a-col>
  </a-row>

  <a-row :gutter="16" v-if="d_hot == 0">
    <a-col class="gutter-row" :span="6" v-for="shops in sortedData" >
      <RouterLink :to="{
        name:'xiangqing',
        query:{
          name:shops.name,
          des:shops.des,
          seller:shops.seller,
          comment:JSON.stringify(shops.comment),//这里是数组对象，不能直接传递字符串，因此要转成json文件
          img:shops.img,
          price:shops.price
        }
      }" @click="count(shops)">
        <div class="gutter-box">
          <div class="img_pos">
            <img :src="imaUrl(shops.img)">
          </div>
          <div class="shops_name">
            {{ shops.name }}
          </div>
        </div>
      </RouterLink>  
    </a-col>
  </a-row>

</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
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
        user:'啥东西不会',
        content:'good',
      },
      {
        user:'Manbo',
        content:'很好，孩子很喜欢吃！',
      },
      {
        user:'yc',
        content:'不如省点钱充个原神648'
      }
    ],
    price:'30',
    hot:5,
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
    hot:1,
    count:0,
  },
  {
    name:'夏日凉枕',
    id:'3',
    img:'pillow.avif',
    des:'清凉舒适，适合男女老少，枕头高度合适',
    seller:'ycc',
    comment:[{
      user:'shipship',
      content:'便宜而且好用！'
    }],
    price:'60',
    hot:9,
    count:0,
  },
  {
    name:'办公椅',
    id:'4',
    img:'chair.avif',
    des:'坐下舒适，符合人体工程学，价格合适，适合久坐党入手',
    seller:'999',
    comment:[{
      user:'ship123',
      content:'坐着很舒适！'
    }],
    price:'200',
    hot:2,
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
    hot:3,
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
    hot:8,
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
    hot:10,
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
    hot:6,
    count:0,
  }
])

const imaUrl = (url: string) => { //动态设置图片地址
  return new URL(`../assets/${url}`, import.meta.url).href
}

const rank = rank_data()

const count = (shopdata:any) => {
  rank.count_arry[shopdata.id - 1]++
}

const set_count = () => {
    for(let i=0;i<datashop.value.length;i++){
        datashop.value[i].count = rank.count_arry[i] * 0.4 + datashop.value[i].hot * 0.6 || 0
    }
}

onMounted(() => {
  set_count();
});

const sortedData = computed(() => {  //根据set_count后的数据进行排序
  return [...datashop.value].sort((a, b) => Number(b.count) - Number(a.count));
});

let d_hot = ref(1)

const display_hot = () => {
  d_hot.value = 0
}

const display_default = () => {
  d_hot.value = 1
}

</script>
<style scoped>
:deep(.slick-slide) {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #dadff9;
  overflow: hidden;
  display: flex;
}

.gutter-box {
  margin-top: 50px;
  background: #ddeffd;
  /* padding: 8px 0; */
  height: 250px;
}

img {   /* 防止图片挤压，图片居中显示，多余的会被裁剪 */
  width:100%;
  height:100%;
  object-fit: cover; 
}

.img_pos {
  height: 200px;
  width: 100%;
  background-color: aquamarine;
}

.shops_name {
  height: 50px;
  width: 100%;
  font-size: large;
  text-align: center;
  padding: 15px 0;
}

.carousel_img { /* 走马灯图片设置 */
  height: 300px;
  width: 400px;
  background-color:aqua;
  margin: auto;
}
</style>