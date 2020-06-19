
import { requestAPI } from '../utils/common'

// 上传视频
let mUploadVideo = (data) => {
  return requestAPI('/bdc/user/pos/upload', data, 'POST')
}
// 获取处理结果视频
let mResultVideo = (data) => {
  return requestAPI('/bdc/user/pos/get', data)
}

export default {
  mUploadVideo,
  mResultVideo
}
