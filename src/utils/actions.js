
import { requestAPI } from '../utils/common'

let text = (data) => {
  return requestAPI('city/price/list', data)
}

export {
  text
}
