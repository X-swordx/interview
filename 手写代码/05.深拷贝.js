// 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

const symbolName = Symbol();
const obj = {
  objNumber: new Number(1),
  number: 1,
  objString: new String('ss'),
  string: 'string',
  objRegexp: new RegExp('\\w'),
  regexp: /w+/g,
  date: new Date(),
  function: function () { },
  array: [{ a: 1 }, 2],
  [symbolName]: 111
}
obj.d = obj;

const isObject = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');
const isFunction = obj => typeof obj === 'function'
function deepClone (obj, hash = new WeakMap()) {
  if (hash.get(obj)) {
    // 环处理
    return hash.get(obj);
  }
  if (!isObject(obj)) {
    return obj;
  }

  if (isFunction(obj)) {
    // function返回原引用
    return obj;
  }

  let cloneObj;

  const Constructor = obj.constructor;

  switch (Constructor) {
    case Boolean:
    case Date:
      return new Date(+obj);
    case Number:
    case String:
    case RegExp:
      return new Constructor(obj);
    default:
      cloneObj = new Constructor();
      hash.set(obj, cloneObj);
  }

  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
    cloneObj[k] = deepClone(obj[k], hash);
  })
  return cloneObj;
}


const o = deepClone(obj)
console.log(o.objNumber === obj.objNumber);
console.log(o.number === obj.number);
console.log(o.objString === obj.objString);
console.log(o.string === obj.string);
console.log(o.objRegexp === obj.objRegexp);
console.log(o.regexp === obj.regexp);
console.log(o.date === obj.date);
console.log(o.function === obj.function);
console.log(o.array[0] === obj.array[0]);
console.log(o[symbolName] === obj[symbolName]);