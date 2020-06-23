import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VideoPlayer from 'vue-video-player'

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

Vue.config.productionTip = false
import imgSrc1 from './assets/1.png';
import imgSrc2 from './assets/2.png';
import imgSrc3 from './assets/3.png';
import imgSrc4 from './assets/4.png';
import imgSrc5 from './assets/5.png';
import imgSrc6 from './assets/6.png';
Vue.prototype.videoDetaultList = [
  {
    id: 0, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/3e0c522fa3e7488397d5912dfbec9305',
    imgSrc: imgSrc1, 
    name: '肩部外展'
  },
  {
    id: 1, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/acea2b65b359485c8815e013332b7b3f',
    imgSrc: imgSrc2, 
    name: '肘部屈伸'
  },
  {
    id: 2, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/4cac7d7529f24faabad3c34c15f86878',
    imgSrc: imgSrc3, 
    name: '侧卧髋外展肌力训练（右）'
  },
  {
    id: 3, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/e730b90c31474e0c8a3366fcd118efb9',
    imgSrc: imgSrc4, 
    name: '髋屈曲'
  },
  {
    id: 4, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/30b077f70c834cca9dfa6a3e1ff8e475',
    imgSrc: imgSrc5, 
    name: '俯卧屈膝'
  },
  {
    id: 5, 
    src: 'https://huifuwangxiao.oss-cn-hangzhou.aliyuncs.com/example/mp4/f18ef3cbfd6648da8c4d424a3d649bc3',
    imgSrc: imgSrc6, 
    name: '坐姿踝背屈'
  },
]


Vue.use(VideoPlayer);


window.videoDetail = {};


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
