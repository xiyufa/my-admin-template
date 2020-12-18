/**
 * 时间格式化工具
 */
class DateFormat {
  /**
   * 格式化时间
   * @param {*} date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
   * @param {*} fmt 格式'yyyy-MM-dd hh:mm:ss'
   * @returns {String}
   */
  format(dater = new Date(), fmt) {
    const date = typeof dater === 'number' ? new Date(dater) : dater
    const o = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }

    let res = this._isNotEmpty(fmt) ? fmt : 'yyyy-MM-dd hh:mm:ss'
    for (let k in o) {
      if (new RegExp(`(${k})`).test(res)) {
        res = res.replace(RegExp.$1, k === 'y+' ? `${o[k]}`.substr(4 - RegExp.$1.length) : this._fillZero(o[k]))
      }
    }
    return res
  }

  /**
   * 时分秒补领
   * @param {*} num
   */
  _fillZero(num) {
    return `${num}`.padStart(2, 0)
  }

  /**
   * 非空判断
   * @param {String} str
   */
  _isNotEmpty(str) {
    if (str !== '' && str !== null && str !== undefined) {
      return true
    }
    return false
  }

  /**
   * 字符串类型的时间 转换成Date类型的方法
   * @param {String} dateStr 字符串类型的时间
   */
  formatToDate(dateStr) {
    if (this._isNotEmpty(dateStr)) {
      return new Date(Date.parse(dateStr.replace(/-/g, '/')))
    }
    return ''
  }

}

export default new DateFormat()
