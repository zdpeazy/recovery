<template>
  <div class="p_content">
    <div class="video_list">
      <div class="item" v-for="item in videoList" :key="item.id" @click="handlerLookVideo(item.id)">
        <div class="left">
          <img :src="item.src" alt="">
        </div>
        <div class="right">
          <div class="title">{{item.name}}</div>
          <div class="r_b">
            <span class="l_video">观看并上传</span>
          </div>
        </div>
      </div>
    </div>
    <div class="look_result" @click="handlerLookTest">
      <span>评测结果查询</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      videoList: []
    }
  },
  created(){
    this.videoList = [
        {id: 0, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
        {id: 1, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
        {id: 2, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
        {id: 3, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
        {id: 4, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
        {id: 5, src: 'https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347', name: '肩部外展动作展示'},
      ]
  },
  methods: {
    handlerLookVideo(id){
      this.$router.push({
        path: `/detail/${id}` 
      })
    },
    handlerLookTest(){
      this.$router.push({
        path: '/testList'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .video_list{
    width: 7.14rem;
    height: 9.19rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.06rem;
    overflow-y: auto;
    .item{
      display: flex;
      align-items: center;
      background: #fff;
      box-sizing: border-box;
      padding: 0.3rem;
      margin-top: 0.12rem;
      border-bottom: 0.12rem solid #E8E8E8;
      &:last-child{
        border: none;
      }
      .left{
        width: 2.78rem;
        height: 1.58rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .right{
        padding-left: 0.3rem;
        .title{
          font-size: 0.32rem;
          color: #030303;
        }
        .r_b{
          .l_video{
            display: inline-block;
            width: 1.8rem;
            height: 0.54rem;
            font-size: 0.28rem;
            color: #5BC5B3;
            border: 0.01rem solid #5BC5B3;
            border-radius: 0.06rem;
            text-align: center;
            line-height: 0.54rem;
          }
        }
      }
    }
  }
  .look_result{
    padding-top: 0.28rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    text-align: center;
    text-decoration: underline;
  }
</style>