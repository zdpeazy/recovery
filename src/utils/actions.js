
import { requestAPI } from '../utils/common'

// 上传视频
let mUploadVideo = (data) => {
  return requestAPI('/bdc/user/pos/upload', data)
}

export default {
  mUploadVideo
}
