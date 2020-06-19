<template>
  <div class="p_content">
    <div class="v_container">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer" 
        :playsinline="true" 
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="desc">
      {{videoTitle}}
    </div>
    <div class="code">
      <div class="i_list" @click="handlerClickInput">
        <div 
          v-for="(item, index) in codeNumber"
          :key="item"
          :class="inputValue.length <= index ? 'codeNumber' : 'codeNumber active'">
          {{inputValue[index]}}
        </div>
      </div>
      <div class="c_tip">
        请输入特权码
        <i></i>
      </div>
      <input 
        class="codeInput" 
        ref="codeInput" 
        type="number" 
        v-model="inputValue" 
        @input="handleOnInput()" />
    </div>
    <div class="uploadBtn">
      <span>上传评测视频</span>
      <input class="uploadInput" accept="video/*" type="file" value="上传评测视频" @change.prevent="videoControl">
    </div>
    
  </div>
</template>

<script>
import {
  showLoading,
  hideLoading,
  showToast
  // showAlertBox
} from '../utils/common'
import axios from 'axios'

export default {
  data(){
    return {
      playerOptions : {
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
      },
      inputValue: '',
      codeNumber: [1, 2, 3, 4],
      videoTitle: ''
    }
    
  },
  created () {
    this.id = this.$route.params.id;
  },
  mounted () {
    const currentVideo = this.videoDetaultList.find(item => {
      return item.id == this.id;
    })
    this.playerOptions.poster = currentVideo.imgSrc;
    this.playerOptions.sources[0].src = currentVideo.src;
    this.videoTitle = currentVideo.name;
  },
  methods: {
    // 获取code焦点
    handlerClickInput(){
      this.$refs.codeInput.focus();
    },
    // 监听input值修改
    handleOnInput(){
      let value = this.$refs.codeInput.value;
      this.inputValue = value.length > 4 ? value.slice(0, 4) : value;
    },
    // 监听input的上传事件
    videoControl(e){
      showLoading('上传中，请稍候');
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.uploadVideo(files[0]);
    },
    // 上传视频
    async uploadVideo(file){
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }; //添加请求头

      let baseUrl = `${location.origin}/bdc/user/pos/upload?tk=${this.$token}&position=${this.id}`
      if(this.inputValue.length > 0){
        baseUrl = `${baseUrl}&code=${this.inputValue}`
      }
      axios.post(baseUrl, param, config)
      .then(response=>{
        let res = response.data;
        hideLoading();
        if(res.code != 0){
          showToast(res.message);
          return;
        }
        showToast('上传成功');
        this.$router.push({
          path: `/result/${this.id}?orgVideo=${res.data.pos.orgVideo}`
        })
        
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
    .desc{
      padding-top: 0.2rem;
      font-size: 0.32rem;
      color: #030303;
    }
    .uploadBtn{
      width: 90%;
      height: 0.9rem;
      line-height: 0.9rem;
      background: #5BC5B3;
      border-radius: 0.06rem;
      text-align: center;
      font-size: 0.32rem;
      color: #FFFFFF;
      position: absolute;
      bottom: 0.3rem;
      left: 5%;
      position: relative;
      .uploadInput{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .code{
      width: 100%;
      padding: 0.5rem 0 1rem;
      position: relative;
      .i_list{
        display: flex;
        justify-content: center;
        .codeNumber{
          width: 0.8rem;
          height: 0.6rem;
          outline: 0;
          border: none;
          border-bottom: 0.02rem solid #E1E1E1;
          margin-left: 0.15rem;
          text-align: center;
          font-weight: 700;
          font-size: 0.4rem;
          border-radius: 0;
          &.active{
            border-color: #000;
          }
          &:first-child{
            margin: 0;
          }
        }
      }
      .codeInput{
        width: 0.01rem;
        height: 0.01rem;
        position: absolute;
        top: 0;
        left: -7.5rem;
        outline: none;
        border: 0;
      }
      .c_tip{
        width: 2.44rem;
        height: 0.68rem;
        background: #EEEEEE;
        border-radius: 0.34rem;
        font-size: 0.28rem;
        color: #838383;
        text-align: center;
        line-height: 0.68rem;
        margin: 0.3rem auto 0;
        position: relative;
        i{
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          background: #EEEEEE;
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          position: absolute;
          top: -0.06rem;
          left: 50%;
          margin-left: -0.11rem;
        }
      }
      
    }
  }
</style>