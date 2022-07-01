/* function _new () {
  // 1. 创建一个新的对象
  let obj = new Object()
  // 2. 将创建的对象的 __proto__ 指向 构造函数的 prototype
  let classFn = Array.prototype.shift.call(arguments)
  obj.__proto__ = classFn.prototype
  // 3. 执行构造函数并将 this 执行新创建的对象
  let result = classFn.call(obj, ...arguments)
  // 4. 返回结果
  return typeof result === 'function' || (typeof result === 'object' && result !== null) ? result : obj
}

function Person (name, age) {
  this.name = name
  this.age = age
}

let p = _new(Person, 'xiaoming', 18)
console.log(p)
console.log(p instanceof Person) */

// 阿里面试题
function Dog (name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('wangwang')
}
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name)
}

let sanmao = _new(Dog, '三毛')
sanmao.bark() // => 'wangwang'
sanmao.sayName() // => 'may name is 三毛'
console.log(sanmao instanceof Dog)

// 重写new方法
function _new() {
  // 1、拿第一个参数：构造函数
  let originFn = Array.prototype.shift.call(arguments)
  // 2、将新创建的对象的 __proto__ 指向 构造函数的 prototype(原型链继承)
  let obj = Object.create(originFn.prototype) // === obj.__proto__ = classFn.prototype
  ///3、执行构造函数，this指向新创建的对象(继承构造函数的属性)
  let result = originFn.call(obj, ...arguments)
  ///4、返回结果
  return typeof result === 'function' || (typeof result === 'object' && result !== null) ? result : obj
}