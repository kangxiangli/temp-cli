<template>
  <div id="app">
    <div class="main">
      <!-- 根据文字是否溢出展示tooltip start -->
      <div class="title">链式组件, 仅需传递 <div class="block">data</div>即可。</div>
      <div class="content">
        <v-svg-chain @clickItem="testClick" style="height: 300px;" :data="originData" :style="{ backgroundColor: 'black' }">
        </v-svg-chain>
      </div>
      <!-- 根据文字是否溢出展示tooltip end -->

       <!-- 始终展示tooltip start -->
      <div class="title">链式组件纵向 需要指定<div class="block">direction</div>为<div class="block">vertical</div></div>
      <div class="content">
        <v-svg-chain style="height: 600px;" :data="originData" :style="{ backgroundColor: 'black' }" direction="vertical">
        </v-svg-chain>
      </div>
      <!-- 始终展示tooltip end -->
   
     <div class="title">下面这种也是链式数据展示详情看<div class="block">https://www.npmjs.com/package/v-custom-steps</div></div>
    <div class="content">
      <vCustomSteps :data="originData"  align-center  style="height: 600px; " direction="horizontal"></vCustomSteps>
    </div>
  </div>
</div>
</template>

<script>
import vSvgChain from '../src/lib/v-svg-chain.vue'
export default {
  name: 'app',
  components: {
    vSvgChain
  },
  data () {
    return {
      originData:[
        {
          "key": "/System_Compromise",
          "name": "系统损害",
          "value": 232
        },
        {
          "key": "/Exploitation_Installation",
          "name": "安装&植入",
          "value": 211
        },
        {
          "key": "/Delivery_attack",
          "name": "传送&攻击",
          "value": 189
        },
        {
          "key": "/Delivery_attack1",
          "name": "测试数据",
          "value": 166
        },
        {
          "key": "/Exploitation_Installation",
          "name": "安装&植入",
          "value": 211
        },
        {
          "key": "/Delivery_attack",
          "name": "传送&攻击",
          "value": 189
        },
        {
          "key": "/Delivery_attack1",
          "name": "测试数据",
          "value": 166
        }
      ]
    }
  },
  methods: {
    testClick (e, item, index) {
      console.log('点击操作~~', e, item, index)
    }
  }

}
</script>

<style  lang="postcss">

html,body{
  width: 100%;
  height: 100%;
  background:rgba(1, 3, 46, 1);
}
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul{
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content{
  width: 90%;
  margin: 10px auto;
  background: rgba(255,255,255,0.05)
}
.main{
  padding: 16px;
  .title{
    height: 30px;
    line-height: 30px;
    background: rgba(255,255,255,0.05);
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    border-left: 2px solid #259ee3;
    padding-left: 4px;
    margin: 16px 0;
  }
}

.block{
  color: coral;
  background: #867f7f61;
  padding: 0 16px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 500;
  margin: 0 5px;
}
.value {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}
</style>
