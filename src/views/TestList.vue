<template>
  <div class="p_content">
    <div class="video_list">
      <div class="item">
        <div class="left">
          <img src="https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">评估中</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：2020.5.19</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">评估中</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：2020.5.19</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">评估中</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：2020.5.19</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">评估中</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：2020.5.19</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <img src="https://oimagea5.ydstatic.com/image?id=-5285314247220546696&product=adpublish&w=520&h=347" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span class="status">评估中</span>
          </div>
          <div class="r_b">
            <span class="l_video">上传时间：2020.5.19</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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