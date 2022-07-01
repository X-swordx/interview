/**
 * @description: 简单尝试手搓 Promise
 * @param {*} 无
 * @return {*} 无
 */
 class Commitment {
  // 状态属性
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  // 构造器
  constructor(func) {
    // 初始状态
    this.status = Commitment.PENDING;
    // 结果参数
    this.result = null;

    // 判断代码有无抛出错误
    try {
      // 执行函数，并使用 .bind() 绑定执行函数的执行域
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      // 如果有抛出错误，则直接调用 reject() 回调
      this.reject(error.message);
    }
  }

  /**
   * @description: resolve 成功回调
   * @param { any } result 成功回调结果
   * @return {*}
   */
  resolve(result) {
    // 判断状态是否是待定
    if (this.status === Commitment.PENDING) {
      // 将状态改为成功
      this.status = Commitment.FULFILLED;
      // 拿到传入的成功回调参数
      this.result = result;
    }
  }

  /**
   * @description: reject 失败回调
   * @param { any } result 失败回调结果
   * @return {*}
   */
  reject(result) {
    // 判断状态是否是待定
    if (this.status === Commitment.PENDING) {
      // 将状态改为失败
      this.status = Commitment.REJECTED;
      // 拿到传入的失败回调参数
      this.result = result;
    }
  }

  /**
   * @description: .then 回调结果
   * @param { function } onFULFILLED 执行成功回调结果
   * @param { function } onREJECTED 执行失败回调结果
   * @return { Promise } 返回一个新的 Promise
   */
  then(onFULFILLED, onREJECTED) {
    // 返回一个新的 Promise 来实现 .then 的链式编程
    return new Commitment((resolve, reject) => {
      // 判断传入的回调函数是否不是函数，如果不是，则将其修改为一个空对象
      onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : value => value;
      onREJECTED = typeof onREJECTED === "function" ? onREJECTED : err => { throw err};

      // 使用定时器使代码变为异步执行
      setTimeout(() => {
        // 回调结果为成功 or 失败时
        if (this.status === Commitment.FULFILLED) {
          // 执行成功回调
          resolve(onFULFILLED(this.result))
        } else if (this.status === Commitment.REJECTED) {
          // 执行失败回调
          reject(onREJECTED(this.result))
        }
      }, 0);
    });
  }
}

// 实例化类
console.log('手写 Promise', 1);
let commitment = new Commitment((resolve, reject) => {
  console.log('手写 Promise',2);
  setTimeout(() => {
    resolve('手写 Promise3');
    console.log('手写 Promise', 4);
  });
});

// 使用 .then
commitment
  .then(
    (res) => {
      console.log(res);
      return '手写 Promise 链式编程'
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );

console.log('手写 Promise',5);

/**
 * 原生 Promise 是如何执行的？
 * 1. 实例化 Promise 对象：使用构造函数或者 class 实现
 * 2. 实例化时执行函数，并带有 resolve reject 回调：使用构造器执行成功与失败回调
 * 3. 保持状态，且状态一旦改变不会更改：padding(等待) fulfilled(成功) reject(失败)
 * 4. 使用 resolve 与 reject 改变当前 Promise 状态并拿到执行参数：使用两个实例方法执行
 * 5. .then 执行回调结果
 * 6. 异步执行：使用定时器执行 .then 回调
 * 7. 链式执行：让 .then 返回一个新的 Promise 来实现链式编程
 *
 *
 * 特性1：抛出错误时会调用 reject() 错误回调：在执行前进行判断，代码有无抛出错误
 * 特性2：.then 回调传入非函数不会报错
 */
