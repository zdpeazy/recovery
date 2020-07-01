import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VideoPlayer from 'vue-video-player'
import axios from 'axios'

import './static/reset.css'
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';

// import actions from './utils/actions';

function getQueryVariable(variable){
  var query = location.search.substring(1);
  var vars = query.split("&");
  console.log(vars)
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

// Object.defineProperties(Vue.prototype, {
//   $api: {
//     get() {
//       return actions
//     }
//   }
// })
const token = getQueryVariable('tk');
if(token){
  Vue.prototype.$token = token;
  localStorage.setItem('tk', token);
} else {
  Vue.prototype.$token = localStorage.getItem('tk');
}

Vue.prototype.$getTkUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2ca4c583f27f13c6&response_type=code&scope=snsapi_base&state=STATE&redirect_uri=https%3a%2f%2fm.urehab.cn%2fbdc%2fuser%2flogin&_=bbbb'

Vue.config.productionTip = false
Vue.prototype.videoDetaultList = [
  {
    id: 0, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/3e0c522fa3e7488397d5912dfbec9305',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/1.png', 
    name: '肩部外展'
  },
  {
    id: 1, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/acea2b65b359485c8815e013332b7b3f',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/2.png', 
    name: '肘部屈伸'
  },
  {
    id: 2, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/4cac7d7529f24faabad3c34c15f86878',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/3.png', 
    name: '侧卧髋外展肌力训练（右）'
  },
  {
    id: 3, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/e730b90c31474e0c8a3366fcd118efb9',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/4.png', 
    name: '髋屈曲'
  },
  {
    id: 4, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/30b077f70c834cca9dfa6a3e1ff8e475',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/5.png', 
    name: '俯卧屈膝'
  },
  {
    id: 5, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/f18ef3cbfd6648da8c4d424a3d649bc3',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/6.png', 
    name: '坐姿踝背屈'
  },
]


Vue.use(VideoPlayer);


window.videoDetail = {};

const sharData = {
  title: 'ROM智能评测',
  desc: '上传视频，即刻获得专业关节活动度评估报告',
  link: 'https://m.urehab.cn/bdc',
  imgUrl: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/logo.png'
}

try {
  axios.get(`${location.origin}/bdc/user/wx_config?tk=${token}&url=${encodeURIComponent(location.href.split('#')[0])}&timestamp=${Date.parse(new Date())}`, {}, {
    headers:{'Content-Type':'multipart/form-data'}
  })
  .then(response=>{
    let res = response.data;
    if(res.code != 0){
      if(res.code == 2003){
        location.replace(Vue.prototype.$getTkUrl)
        return;
      }
      console.log('获取微信配置失败');
      return;
    }
    // 分享
    wx.config({
      debug: true, 
      appId: res.data.config.appid, // 必填，公众号的唯一标识
      timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串
      signature: res.data.config.signature,// 必填，签名
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo']
    });
  
    wx.ready(function(){
      wx.updateAppMessageShareData(sharData);
      wx.updateTimelineShareData(sharData);
      wx.onMenuShareWeibo(sharData);
    });
  })
} catch(err) {
  console.log(err)
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
