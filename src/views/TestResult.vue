<template>
  <div class="p_content">
    <div class="v_container">
      <video-player
        v-if="this.playerOptions.sources[0].src"
        class="video-player vjs-custom-skin"
        ref="videoPlayer" 
        :x5-playsinline="true" 
        :playsinline="true" 
        :webkit-playsinline="true" 
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="testDetail">
      <div class="title">
        <span class="border"></span>
        <span class="text">测评结果</span>
      </div>
      <div class="result">
        <div class="left">
          <span class="border"></span>
        </div>
        <div class="right">
          <div class="title">{{result.title}}</div>
          <div class="desc" v-if="result.data">
            <span v-for="(key,value,index) in result.data" :key="index">您的{{value}}活动范围是{{key}}度，</span>
            评估结果为{{result.title}}
          </div>
          <div class="desc" v-else>
            评估结果处理中
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  showLoading,
  hideLoading,
  showToast
} from '../utils/common';

export default {
  data(){
    return {
      timer: null,
      item: {},
      result: {},
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: '' //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  created () {
    this.id = this.$route.params.id;
  },
  mounted () {
    showLoading('加载中...');
    this.getResultVideo(this.id, true);
  },
   // 最后在beforeDestroy()生命周期内清除定时器：
  beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
  },
  methods: {
    getResultVideo(id, isFirst){
      axios.get(`${location.origin}/bdc/user/pos/get?tk=${this.$token}`, {}, {
        headers:{'Content-Type':'multipart/form-data'}
      })
      .then(response=>{
        let res = response.data;
        if(res.code != 0){
          if(res.code == 2003){
            window.location.replace(this.$getTkUrl);
            return;
          }
          showToast(res.message)
          return;
        }

        const videoList = res.data.pos,
          oss_domain = res.data.oss_domain;
        const item = videoList.find(i => {
          return i.id == id;
        });
        let sourcesVideo = `${oss_domain}${item.orgVideo}`
        if(+item.status == 3000 ){
          if(item.resultVideo){
            sourcesVideo = `${oss_domain}${item.resultVideo}`
          };
          let result = JSON.parse(item.result);
          this.result = result;
        } else {
          this.result = {
            title: +item.status == 1000 ? '已创建' : '评估中',
            data: ''
          }
        }
        
        this.playerOptions.sources[0].src = sourcesVideo;
        isFirst ? hideLoading() : '';
        this.timer = setTimeout(() => {
          this.getResultVideo(id, false);
        }, 5000)
      })

    }
  }
}
</script>
<style lang="scss" scoped>
  .p_content{
    width: 7.14rem;
    min-height: 8.63rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.06rem;
    box-sizing: border-box;
    padding: 0.3rem;
    position: relative;
    
    .v_container{
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    .testDetail{
      .title{
        .border{
          display: inline-block;
          width: 0.07rem;
          height: 0.28rem;
          background: #FFC658;
        }
        .text{
          padding-left: 0.2rem;
          font-size: 0.28rem;
          color: #707070;
          position: relative;
          top: -0.02rem;
        }
      }
      .result{
        display: flex;
        margin-top: 0.45rem;
        .left{
          width: 0.27rem;
          height: auto;
          .border{
            display: inline-block;
            width: 0.01rem;
            height: 100%;
            background: #FFC658;
          }
        }
        .right{
          flex: 1;
          .title{
            font-size: 0.34rem;
            color: #030303;
          }
          .desc{
            padding-top: 0.2rem;
            line-height: 0.3rem;
            font-size: 0.26rem;
            color: #030303;
          }
        }
      }
    }
  }
</style>