const getObjectKeys = (obj = {}, keys = []) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if(keys.includes(key)) {
        acc[key] = obj[key]
      }
      return acc
    },
    {}
  );
};
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};
const newObj = getObjectKeys(obj, ['a', 'b', 'c', 'd']);
console.log(newObj);
