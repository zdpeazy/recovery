<template>
  <div id="app">
    <div class="banner"></div>
    <router-view/>
    <div class="copyright">
      <div class="com_name">版权所有：北京慧复科技有限公司</div>
      <div>咨询电话：<a href="tel:400-102-5882">400-102-5882</a></div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return {}
  }
}
</script>

<style lang="scss">
html, body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  min-height: 100%;
  background: #45B9A1;
  box-sizing: border-box;
  padding-bottom: 1rem;
  .banner{
    width: 100%;
    height: 3rem;
    background: url('assets/banner.png') no-repeat;
    background-size: 100% 100%;
  }
  .copyright{
    color: #fff;
    font-size: 0.24rem;
    text-align: center;
    .com_name{
      padding: 0.2rem 0;
    }
    a{
      color: #fff;
      text-decoration: none;
    }
    a:active{
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
