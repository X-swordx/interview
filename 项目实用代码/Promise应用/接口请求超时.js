
/* 
* 就是给定一个时间，如果接口请求超过这个时间的话就报错
* 实现思路就是：接口请求和延时函数赛跑，并使用一个Promise包着，
* 由于Promise的状态是不可逆的，
* 所以如果接口请求先跑完则说明未超时且Promise的状态是fulfilled，
* 反之，延时函数先跑完则说明超时了且Promise的状态是rejected，最后根据Promise的状态来判断有无超时 
*/

/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay) {
  return new Promise((_, reject) => {
    setTimeout(() => reject('超时喽！'), delay)
  })
}
/**
 * 模拟请求
 */
function request() {
  // 假设请求需要 1s
  return new Promise(resolve => {
    setTimeout(() => resolve('请求成功'), 1000)
  })
}
/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
function timeoutPromise(requestFn, delay) {
  return Promise.race([requestFn(), sleep(delay)])
}


// ---------------------- 测试 -------------------------------------

// 超时
// timeoutPromise(request, 500).catch(err => console.log(err)) // 超时喽

// 不超时
timeoutPromise(request, 2000).then(res => console.log(res)) // 成功喽
