import moment from 'moment'

// 时间转换
export const dateFormat = (str, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!str) {
    return ''
  }
  return moment(str).format(fmt)
}

