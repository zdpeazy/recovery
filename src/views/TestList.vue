<template>
  <div class="p_content">
    <div class="video_list">
      <div class="item" v-for="item in videoList" :key="item.id" @click="handlerLookTestResult(item)">
        <div class="left">
          <img :src="item.imgSrc" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">{{item.title}}</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：{{item.updateTime || item.updateTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  showAlertBox,
  showToast
} from '../utils/common'
import axios from 'axios'
export default {
  data(){
    return {
      videoList: [],
      oss_domain: ''
    }
  },
  created(){
    this.getResultVideo();
    this.videoList = []
  },
  methods: {
    async getResultVideo(){
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头
      axios.get(`${location.origin}/bdc/user/pos/get?tk=${this.$token}`, {}, config)
      .then(response=>{
        let res = response.data;
        if(res.code != 0){
          showToast(res.message)
          return;
        }
        if(res.data.pos.length < 1){
          showAlertBox(
            '没有您的评测结果<br>请返回首页观看并上传视频',
            false,
            '确定',
            '',
            () => {
              this.$router.go(-1);
            }
          )
          return;
        }
        this.oss_domain = res.data.oss_domain;
        this.videoList = res.data.pos;
      })

    },
    handlerLookTestResult(item){
      this.$router.push({
        path: `/testResult/${item.id}?resultVideo=${item.resultVideo}` 
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .video_list{
    width: 7.14rem;
    min-height: 9.19rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.06rem;
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
          span{
            padding-right: 0.4rem;
            position: relative;
            &:after{
              content: '';
              display: inline-block;
              width: 0.24rem;
              height: 0.24rem;
              background: url('../assets/icon_next.png') no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -0.12rem;
            }
          }
        }
        .r_b{
          padding-top: 0.28rem;
          font-size: 0;
          .l_video{
            font-size: 0.24rem;
            color: #848484;
          }
        }
      }
    }
  }
</style>