<template>
  <div class="p_content">
    <div class="v_container">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer" 
        :playsinline="true" 
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="returnUpload" @click="handlerBackHome">返回首页查看评测结果</div>
  </div>
</template>

<script>
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
      }
    }
  },
  created () {
    this.id = this.$route.params.id;
  },
  mounted () {
    this.playerOptions.sources[0].src = `https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/${this.$route.query.orgVideo}`;
  },
  methods: {
    handlerBackHome(){
      this.$router.go(-2);
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
    .returnUpload{
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
    }
  }
</style>