# 实现鼠标拖动选择两个div

#### HTML
```html
<div id="box1"></div>
<div id="box2"></div>
```
#### CSS
```css
#boxl { 
  position: absolute; 
  left: 10; 
  top: 10px; 
  width: 100px; 
  height: 100px; 
  background: yellow; 
}
#box2 { 
  position: absolute; 
  left: 200px; 
  top: 200px; 
  width: 200px; 
  height: 200px; 
  background: red; 
}

```
#### JS
```js
var div1=document.getElementById('div1')
var down=false
var mousetop=0
var mouseleft=0
window.onmousedown=function({x,y}){
  let divH=div1.clientHeight  //这四个不能写在外面
  let divW=div1.clientWidth   //这四个不能写在外面
  //这四个不能写在外面，div左上角距窗口左边距
  let top=div1.offsetTop   
  //这四个不能写在外面，div左上角距除菜单栏窗口上边距
  let left=div1.offsetLeft
  //如果鼠标按下的位置在div内
  if(y>=top&&y<=top+divH&&x>=left&&x<=left+divW){
    //区分鼠标按着呢还是没按呢
    down = true 
    //如果没设置margin:0这里获取不到
    mousetop=y-parseInt(div1.style.marginTop)  
    mouseleft=x-parseInt(div1.style.marginLeft)
  }
}
window.onmousemove=function(event){
  if(down==true){
    //左margin等于鼠标移动时距离左窗口的实时距离减去鼠标距div左边框的距离
    div1.style.marginLeft=event.clientX-mouseleft+"px"  
    div1.style.marginTop=event.clientY-mousetop+"px"
  }
}
window.onmouseup=function({x,y}){
  down=false
}
```
