// 防抖函数
const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

function throttle (fn, delay) {
  let flag = true
  return (...args) => {
    if(!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}