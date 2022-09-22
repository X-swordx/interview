/* 
  举个例子，咱们在做表单提交时，为了防止多次重复的提交
  肯定会给按钮的点击事件加上防抖措施
  这确实是有效地避免了多次点击造成的重复请求，但是其实还是有弊端的
  众所周知，为了用户更好地体验，防抖的延时是不能太长的
  一般在我的项目中都是300ms
  但是这只能管到请求时间 < 300ms的接口请求
  如果有一个接口请求需要2000ms，那么此时防抖也做不到完全限制重复请求
  所以咱们需要额外做一下取消重复请求的处理 
*/

class CancelablePromise {
  constructor() {
    this.pendingPromise = null
    this.reject = null
  }

  request(requestFn) {
    if(this.pendingPromise) {
      this.cancel('取消重复请求')
    }
    const promise = new Promise((_, reject) => 
      this.reject = reject
    )
    this.pendingPromise = Promise.race([requestFn(), promise])
    return this.pendingPromise
  }

  cancel(reason) {
    this.reject(reason)
    this.pendingPromise = null
  }
}

function api(delay) {
  return () => 
    new Promise(resolve => {
      setTimeout(() => {
        resolve('最后赢家是我')
      }, delay)
    })
}

// ---------------------- 测试 ------------------------
const cancelPromise = new CancelablePromise()
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(api(2000))
    .then((res => { console.log(res) }))
    .catch((err => { console.error(err) }))
}