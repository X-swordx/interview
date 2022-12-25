{/* <div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
} */}

function dom2Json(domtree) {
  let obj = {}
  obj.name = domtree.tagName
  obj.children = []
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)))
  return obj
}

const domTree = () => {
  let div = document.createElement('div')
  let span = document.createElement('span')
  let a1 = document.createElement('a')
  let a2 = document.createElement('a')
  span.appendChild(a1)
  span.appendChild(a2)
  div.appendChild(span)
  return div
}

dom2Json(domTree())

// 扩展思考:如果给定的不是一个 Dom 树结构 
// 而是一段 html 字符串 该如何解析?
// 那么这个问题就类似 Vue 的模板编译原理 
// 我们可以利用正则 匹配 html 字符串 遇到开始标签 结束标签和文本 
// 解析完毕之后生成对应的 ast 并建立相应的父子关联 不断的移动截取剩余的字符串 
// 直到 html 全部解析完毕
