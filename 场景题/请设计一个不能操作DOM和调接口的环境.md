# 请设计一个不能操作DOM和调接口的环境？
实现思路：
- 利用 iframe 创建沙箱，取出其中的原生浏览器全局对象作为沙箱的全局对象
- 设置一个黑名单，若访问黑名单中的变量，则直接报错，实现阻止\隔离的效果
- 在黑名单中添加 document 字段，来实现禁止开发者操作 DOM
- 在黑名单中添加 XMLHttpRequest、fetch、WebSocket 字段，实现禁用原生的方式调用接口
- 若访问当前全局对象中不存在的变量，则直接报错，实现禁用三方库调接口
- 最后还要拦截对 window 对象的访问，防止通过 window.document 来操作 DOM，避免沙箱逃逸
#### 利用 `iframe` 来实现一个沙箱是目前最方便、简单、安全的方法，可以把 `iframe.contentWindow` 作为沙箱执行的全局 window 对象

```js
// 沙箱全局代理对象类
class SandboxGlobalProxy {
  constructor(sharedState) {
    // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement("iframe", { url: "about:blank" });
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    
    // sandboxGlobal作为沙箱运行时的全局对象
    const sandboxGlobal = iframe.contentWindow; 

    return new Proxy(sandboxGlobal, {
      has: (target, prop) => {
        // has 可以拦截 with 代码块中任意属性的访问
        if (sharedState.includes(prop)) {
          // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
          return false;
        }
        
        // 如果没有该属性，直接报错
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Not find: ${prop}!`);
        }
        
        // 属性存在，返回sandboxGlobal中的值
        return true;
      }
    });
  }
}

// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
function withedYourCode(code) {
  code = "with(sandbox) {" + code + "}";
  return new Function("sandbox", code);
}
function maybeAvailableSandbox(code, ctx) {
  withedYourCode(code).call(ctx, ctx);
}

// 要执行的代码
const code = `
  console.log(history == window.history) // false
  window.abc = 'sandbox'
  Object.prototype.toString = () => {
      console.log('Traped!')
  }
  console.log(window.abc) // sandbox
`;

// sharedGlobal作为与外部执行环境共享的全局对象
// code中获取的history为最外层作用域的history
const sharedGlobal = ["history"]; 

const globalProxy = new SandboxGlobalProxy(sharedGlobal);

maybeAvailableSandbox(code, globalProxy);

// 对外层的window对象没有影响
console.log(window.abc); // undefined
Object.prototype.toString(); // 并没有打印 Traped
```