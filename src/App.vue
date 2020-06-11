<template>
  <div id="app">
    <div class="banner"></div>
    <router-view/>
  </div>
</template>

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
  padding-bottom: 0.3rem;
  .banner{
    width: 100%;
    height: 3rem;
    background: url('assets/banner.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
