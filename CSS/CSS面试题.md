## 01. 盒模型

盒模型分为标准盒模型和怪异盒模型

- 标准盒模型：实际宽度由 宽度 + padding + border 组成(box-sizing: content-box)
- 怪异盒模型：内容宽度为 定义的宽度 - padding - border(box-sizing: border-box)

## 02. 什么是文档流

文档流是元素在 web 页面上的一种呈现方式，按照出现的先后顺序进行排列

## 03. 什么是BFC

Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

具有BFC特性的元素可以看做是隔离的容器，它的子元素在布局上不会影响到外面的元素

## BFC的原理布局规则

- 内部的Box会在垂直方向，一个接一个地放置
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反
- BFC的区域不会与float box重叠
- BFC是一个独立容器，容器里面的子元素不会影响到外面的元素
- 计算BFC的高度时，浮动元素也参与计算高度
- 元素的类型和display属性，决定了这个Box的类型。不同类型的Box会参与不同的Formatting Context。
## 04. 触发BFC的条件

- html根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)


## 05. BFC的特性

- 同一个 BFC 下外边距会发生折叠
- BFC 可以包含浮动的元素（清除浮动）
- BFC 可以阻止元素被浮动元素覆盖（实现图文效果）

## 06. 清除浮动的方式

同一层级的元素：另外的元素设置样式 clear: both;

子元素清除父元素的浮动：

- clear属性
- BFC
- 空元素
- 给父元素设置 .clearfix::after{}

```css
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
```

## 07. 盒子里的文字上下居中

```css
.box {
  height: 100px;
  line-height: 100px;
}
```

```css
.box {
  display: table-cell;
  vertical-align: middle;
}
```

```css
.box {
  display: flex;
  align-items: center;
}
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
```

## 08. 盒子里的盒子上下左右居中

```css
.container {
  position: relative;
}
.box {
  display: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
.container {
  display: grid;
  justify-content: center;
  align-content: center;
}
```

```css
.container {
  display: flex;
  /* display: inline-flex; */
}
.box {
  margin: 0 auto;
}
```

```css
.container {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

```css
.container {
  display: table-cell;
  vertical-align: middle;
}
.box {
  margin: 0 auto;
}
```

## 09. rem 和 em 的区别

- rem 是相对于根元素(html)的 font-size 的，1rem = 根元素的 font-size
- em 如果元素自身定义了 font-size，1em = 元素自身的 font-size，如果元素自身没有定义 font-size，那么 1em = 元素的父元素(设置了font-size的父元素)的 font-size
- 如果元素自身的 font-size 设置的就是 em，那么元素自身的 font-size 就根据父元素的 font-size 计算得到