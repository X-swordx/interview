# 利用Promise 模拟并发下载：一共有12个图片，同一时间的并发数不超过4个

```js
var urls = [
  "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
  "https://www.kkkk1000.com/images/getImgData/gray.gif",
  "https://www.kkkk1000.com/images/getImgData/Particle.gif",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
  "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
  "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
  "https://www.kkkk1000.com/images/wxQrCode2.png",
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(url);
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function limitLoad(urls, handler, limit) {
  const promises = [];
  const queue = urls.splice(0, limit).map((url, index) => {
    const _p = handler(url);
    promises.push(_p);
    return _p.then((res) => {
      return [index, res];
    });
  });
  for (const item of urls) {
    const [index] = await Promise.race(queue);
    const _p = handler(item);
    promises.push(_p);
    queue[index] = _p.then((res) => {
      return [index, res];
    });
  }

  return Promise.allSettled(promises);
}

limitLoad(urls, loadImg, 3).then((res) => console.log(res));
```