/**
 * setTimeout模拟setInterval
 * @param {function} callback 执行函数， 如果函数返回值为true则停止运行
 * @param {number} interval 间隔时间
 * @param {bool} async 是否异步
 */
export function simulateInterval(callback, interval, async = false) {
  let timerId = null
  async function fn() {
    // 没有返回值是常态，所以保持继续运行定时器
    let result = false
    if (async) {
      try {
        result = await callback()
      } catch (error) {
        console.error
      }
    } else {
      result = callback()
    }
    // 没有返回值是常态，所以保持继续运行定时器
    if (!result) {
      const prevTimmerId = timerId // 赋值上一次定时器
      timerId = setTimeout(fn, interval) // timerId是闭包值cache，一直存在
      clearTimeout(prevTimmerId) // 清除上一次的定时器
    }
  }

  return setTimeout(fn, interval)
}

/**
 * 将数据切割成二维数组
 * @param {array} array 要切割的数组
 * @param {number} size 每多少个为一组
 */
export function arrChunk(array, size = 1) {
  size = Math.max(+size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))
  // 用while当切割数组时不会影响到遍历
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}
