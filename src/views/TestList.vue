<template>
  <div class="p_content">
    <div class="video_list">
      <div class="empty" v-if="videoList.length < 1">
        <img :src="emptyIcon" alt="">
        <div class="txt">暂无结果<br>请上传视频</div>
      </div>
      <div class="item" v-else v-for="item in videoList" :key="item.id" @click="handlerLookTestResult(item)">
        <div class="left">
          <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer" 
            :x5-playsinline="true" 
            :playsinline="true" 
            :webkit-playsinline="true" 
            :options="playerOptions(item)"
          ></video-player>
          <div class="layer"></div>
        </div>
        <div class="right">
          <div class="pos_title">
            {{item.pos_title}}
          </div>
          <div class="title">
            <span :class="MathStatus(item).className">{{MathStatus(item).title}}</span>
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
  showLoading,
  hideLoading,
  showAlertBox,
  showToast
} from '../utils/common'
import axios from 'axios'
import emptyIcon from '../assets/emoji_none.png';

export default {
  data(){
    return {
      videoList: [],
      oss_domain: '',
      emptyIcon: emptyIcon
    }
  },
  created(){
    this.id = this.$route.params.id;
    showLoading('加载中...');
    this.getResultVideo();
    this.videoList = []
  },
  methods: {
    async getResultVideo(){
      axios.get(`${location.origin}/bdc/user/pos/get?tk=${this.$token}&pos=${this.id}`, {}, {
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
        this.oss_domain = res.data.oss_domain;
        res.data.pos.map(item => {
          item.pos_title = this.videoDetaultList.find(item2 => {
            return  item2.id == item.pos;
          }).name
        })
        this.videoList = res.data.pos;
        hideLoading();
      })

    },
    handlerLookTestResult(item){
      // localStorage.setItem('videoDetail', JSON.stringify(item));
      this.$router.push({
        path: `/testResult/${item.id}` 
      })
    },
  },
  computed: {
    playerOptions: function(){
      var _t = this;
      return item => {
        let sourcesVideo = `${_t.oss_domain}${item.orgVideo}`
        if(+item.status == 3000 ){
          if(item.resultVideo){
            sourcesVideo = `${_t.oss_domain}${item.resultVideo}`
          };
        }
        return {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: sourcesVideo //url地址
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
    MathStatus: () => {
      return item => {
        let status = {
          title: '待评估',
          className: 'status create'
        }
        switch(+item.status){
          case 2000:
            status.title = '评估中';
            status.className = 'status active';
          break;
          case 3000:
            status.title = !JSON.parse(item.result).title ? '评估完成' : JSON.parse(item.result).title;
            status.className = 'status';
          break;
          default:
          break;
        }
        return status;
      }
    }
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
    .empty{
      width: 100%;
      height:  9.19rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 0.8rem;
        height: 0.78rem;
      }
      .txt{
        padding-top: 0.3rem;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.42rem;
      }
    }
    .item{
      display: flex;
      align-items: center;
      background: #fff;
      box-sizing: border-box;
      padding: 0.3rem;
      border-bottom: 0.12rem solid #F6F6F6;
      overflow: hidden;
      &:last-child{
        border: none;
      }
      .left{
        width: 2.78rem;
        height: 1.58rem;
        position: relative;
        text-align: center;
        .video-player{
          width: 2.78rem;
          height: 1.58rem;
        }
        .layer{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }
      .right{
        flex: 1;
        box-sizing: border-box;
        padding-left: 0.3rem;
        .pos_title{
          width: 3.8rem;
          font-size: 0.3rem;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .title{
          padding: 0.2rem 0 0.3rem;
          font-size: 0.3rem;
          color: #000;
          .active{
            color: #D50032;
          }
          .create{
            color: #FF7458;
          }
          span{
            display: inline-block;
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