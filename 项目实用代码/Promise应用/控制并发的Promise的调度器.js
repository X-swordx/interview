/* 
  想象一下，有一天你突然一次性发了10个请求
  但是这样的话并发量是很大的
  能不能控制一下，就是一次只发2个请求
  某一个请求完了，就让第3个补上，又请求完了，让第4个补上
  以此类推，让最高并发量变成可控的 
*/

class Scheduler {
  constructor(limit) {
    this.queue = []
    this.limit = limit
    this.count = 0
  }

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order)
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }

  taskStart(){
    for (let i = 0; i < this.limit; i++) {
      this.request()
    }
  }

  request() {
    if(!this.queue.length || this.count >= this.limit) return
    this.count++
    this.queue.shift()().then(() => {
      this.count--
      this.request()
    })
  }
}

// -------------------------------- 测试 -------------------------------
const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(time, order)
}
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.taskStart();
