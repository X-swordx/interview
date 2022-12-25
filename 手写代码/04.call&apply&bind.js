// 首先我们要清楚 call 方法执行时，内部做了什么
// 1. 将函数的 this 指向 call 方法的第一个参数
// 2. 将 call 方法除第一个参数外的其他参数作为实参传递给 fn
// 3. 立即执行函数

Function.prototype._call = function (context, ...args) {
  // this -> fn , context -> obj , args -> [1, 2]
  context = context == null ? window : context
  // 这里需要注意的是，我们借用给对象添加属性的方式来实现，对于基础数据类型是不能加属性的
  if (!(typeof context === 'object' || typeof context === 'function')) {
    context = Object(context)
  }
  let key = Symbol('key')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

let obj = {a:1}

function fn (a, b) {
  console.log(this)
  return a + b
}

let res = fn.call(obj, 1, 2)
console.log(res, obj)

let res2 = fn._call(obj, 1, 2)
console.log(res2, obj)

Function.prototype._apply = function (context, args) {
  // this -> fn , context -> obj , args -> [1, 2]
  let key = Symbol('key')
  context[key] = this
  const result = context[key](args)
  delete context[key]
  return result
}

let res3 = fn._apply(obj, [1, 2])
console.log(res2, obj)


// 首先我们要清楚 bind 方法执行时，内部发生了什么
// 1. 返回一个新的函数
// 2. 返回的函数的 this 指向 bind 函数的第一个参数
// 3. 将 bind 函数的其他参数作为实参传递给这个返回的新的函数

Function.prototype._bind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  let _this = this;
  //  bind情况要复杂一点
  const result = function (...innerArgs) {
    // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
      delete this[fn];
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
      delete context[fn];
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};

let res4 = fn.bind(obj, 1, 2)
console.log(res4, res4())

let res5 = fn._bind(obj, 1, 2)
console.log(res5, res5())