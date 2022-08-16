class MyPromise {
  constructor(fn) {
    this.state = "pending"
    this.successFun = []
    this.failFun = []

    let resolve = (res) => {
      // 保持状态改变不可变（resolve和reject只准触发一种）
      if(this.state !== "pending") return
      // 成功触发时机 改变状态 同时执行在then中注册的回调事件
      this.state = "success"
      // 为了保证then事件先注册
      setTimeout(() => {
        // 执行当前事件里面所有的注册函数
        this.successFun.forEach(item => {
          item.call(this, res)
        })
      });
    }

    let reject = (err) => {
      // 保持状态改变不可变（resolve和reject只准触发一种）
      if(this.state !== "pending") return
      // 成功触发时机 改变状态 同时执行在then中注册的回调事件
      this.state = "fail"
      // 为了保证then事件先注册
      setTimeout(() => {
        // 执行当前事件里面所有的注册函数
        this.successFun.forEach(item => {
          item.call(this, err)
        })
      });
    }

    // 调用函数
    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // 实例方法 then
  then(resolveCallback, rejectCallback) {
    // 为了保持链式调用  继续返回promise
    return new MyPromise((resolve, reject) => {
      // 将回调注册到successFun里面
      this.successFun.push(val => {
        try {
          // 执行回调函数
          let res = resolveCallback(val)
          // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用;  
          // 如果是一个promise对象（代表又是一个异步） 那么调用res的then方法 将resolve和reject传进去 等到res内部的异步执行完毕的时候就会自动执行传入的resolve 这样就控制了链式调用的顺序
          res instanceof MyPromise ? res.then(resolve, reject) : resolve(res);
        } catch (error) {
          reject(error)
        }
      })
      // 将回调注册到failFun里面
      this.failFun.push(val => {
        try {
          let res = rejectCallback(val)
          res instanceof MyPromise ? res.then(resolve, reject) : reject(res);
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  //静态方法
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        Promise.resolve(promiseArr[i]).then(
          (res) => {
            //promise数组只要有任何一个promise状态变更,其他的promise就不会执行了
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}

// 测试使用
let promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 2000);
});
let promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1234);
  }, 1000);
});

MyPromise.race([promise1, promise2]).then(res => {
  console.log(res);
});

// promise1
//   .then(
//     res => {
//       console.log(res); //过两秒输出123
//       return new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//           resolve("success");
//         }, 1000);
//       });
//     },
//     err => {
//       console.log(err);
//     }
//   )
//   .then(
//     res => {
//       console.log(res); //再过一秒输出success
//     },
//     err => {
//       console.log(err);
//     }
//   );