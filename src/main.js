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

Vue.config.productionTip = false;
let notes1 = [
  '测试时，请尽量与示范动作的起始姿势保持一致，并运动至最大限度关节活动范围；该动作重复2-3次，尽量在20秒内完成。'
],
notes2 = [
  '1.测试时，请尽量与示范动作的起始姿势保持一致，并运动至最大限度关节活动范围；该动作重复2-3次，尽量在20秒内完成。',
  '2.请使用床单或毯子等遮盖非测试侧下肢。'
];

Vue.prototype.videoDetaultList = [
  {
    id: 18, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/fe182aa965244e41987e613a52ffff58',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/1.jpg', 
    name: '（左）肩关节前屈活动度测试',
    notes: notes1
  },
  {
    id: 7, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/9478ca89ab764b129626d626e1b1da15',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/2.jpg', 
    name: '（右）肩关节前屈活动度测试',
    notes: notes1
  },
  {
    id: 16, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/caf6b6cb566244a7a46446de71514568',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/3.jpg', 
    name: '（左）肩关节后伸活动度测试',
    notes: notes1
  },
  {
    id: 5, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/ef71dcb583ed43c88a214473f31d1a29',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/4.jpg', 
    name: '（右）肩关节后伸活动度测试',
    notes: notes1
  },
  {
    id: 11, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/6faca86cbc924f38ba4a2f68af094aae',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/5.jpg', 
    name: '（左）肩关节外展活动度测试',
    notes: notes1
  },
  {
    id: 0, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/3e0c522fa3e7488397d5912dfbec9305',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/6.jpg', 
    name: '（右）肩关节外展活动度测试',
    notes: notes1
  },
  {
    id: 17, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/3f05d1343fb24494932642825a6b657f',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/7.jpg', 
    name: '（左）肩关节内收活动度测试',
    notes: notes1
  },
  {
    id: 6, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/db597e59cc324373a1a39c6fccba5fe7',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/8.jpg', 
    name: '（右）肩关节内收活动度测试',
    notes: notes1
  },
  {
    id: 1, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/acea2b65b359485c8815e013332b7b3f',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/9.jpg', 
    name: '（左）肘关节屈伸活动度测试',
    notes: notes1
  },
  {
    id: 12, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/039aea4783d648eab859dce129159481',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/10.jpg', 
    name: '（右）肘关节屈伸活动度测试',
    notes: notes1
  },
  {
    id: 14, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/2af5134f9c4e4965a8934a8b9d436eae',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/11.jpg', 
    name: '（左）髋关节屈曲活动度测试',
    notes: notes2
  },
  {
    id: 3, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/e730b90c31474e0c8a3366fcd118efb9',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/12.jpg', 
    name: '（右）髋关节屈曲活动度测试',
    notes: notes2
  },
  {
    id: 13, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/214f5674a8814bd5af8bda9dbf7d7e59',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/13.jpg', 
    name: '（左）髋关节外展活动度测试',
    notes: notes2
  },
  {
    id: 2, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/4cac7d7529f24faabad3c34c15f86878',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/14.jpg', 
    name: '（右）髋关节外展活动度测试',
    notes: notes2
  },
  {
    id: 15, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/539a518798a741daba5cb7b1254bf1a8',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/15.jpg', 
    name: '（左）膝关节屈曲活动度测试',
    notes: notes2
  },
  {
    id: 4, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/30b077f70c834cca9dfa6a3e1ff8e475',
    imgSrc: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/static/img/16.jpg', 
    name: '（右）膝关节屈曲活动度测试',
    notes: notes2
  }
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
      // debug: true, 
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
