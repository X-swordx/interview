Function.prototype._call = function (context, ...params) {
  context = context ? context : window
  if (typeof context !== 'object' || typeof context !== 'function') {
    context = Object(context)
  }
  const key = Symbol('key')
  // 保存调用 call 方法的函数
  context[key] = this
  // 传入参数执行函数
  const result = context[key](...params)
  delete context[key]
  return result
}

Function.prototype.myCall = function (context, ...params) {
  context = context ? context : window
  if(typeof context !== 'object' || typeof context !== 'function') {
    context = Object(context)
  }
  let key = Symbol('key')
  context[key] = this
  let result = context[key](...params)
  delete context[key]
  return result
}

Function.prototype._bind = function (context, ...params) {
  let _this = this
  return function proxy (...args) {
    let result = _this.apply(context, params.concat(args))
    return result
  }
}

Function.prototype.myBind = function (context, ...params) {
  let _this = this
  return function proxy (...args) {
    let result = _this.apply(context, params.concat(...args))
    return result
  }
}

function fn (a, b) {
  console.log(this)
  return a + b
}

let obj = {
  name: 'obj'
}

let res = fn.call(obj, 10, 20)
console.log(res)
let res2 = fn._call(obj, 10, 20)
console.log(res2)

let bindFn = fn.bind(obj, 100)
let res3 = bindFn(200)
console.log(res3)

let bindFn2 = fn._bind(obj, 100)
let res4 = bindFn2(200)
console.log(res4)