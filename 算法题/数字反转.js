/* 
小华是个很有对数字很敏感的小朋友，他觉得数字的不同排列方式有特殊美感。某天，小华突发奇想，如果数字多行排列，第一行1个数，第二行2个，第三行3个，
即第n行有n个数字，并且奇数行正序排列，偶数行逆序排列，数字依次累加。这样排列的数字一定很有意思。聪明的你能编写代码帮助小华完成这个想法吗？
规则总结如下：
a、每个数字占据4个位置，不足四位用‘*’补位，如1打印为1***。
b、数字之间相邻4空格。
c、数字的打印顺序按照正序逆序交替打印,奇数行正序，偶数行逆序。
d、最后一行数字顶格，第n-1行相对第n行缩进四个空格
*/

// 数字反转打印
function resNum(num) {
  let j = 0;
  let seen = 1; // k循环中遍历过的数字
  let arr = []; // 承载结果数组
  for (let i = 1; i <= num; i++) { // 遍历
    j++;
    let max = seen + j;
    let kCur = "";
    if (j > 1) {
      arr = arr.map((elx) => "    " + elx); // 从第二行开始对已有的arr每一次循环都在前面加上四个空格
    }
    for (k = seen; k < max; k++) {
      if (j % 2 == 0) { // 判断当前行数是奇数还是偶数
        kCur = (k < max - 1 ? "    " : "") + k.toString().padEnd(4, "*") + kCur;
      } else {
        kCur = kCur + (k > seen ? "    " : "") + k.toString().padEnd(4, "*");
      }
    }
    if (kCur) {
      arr.push(kCur); // 将k循环中拼接出的当前行字符串push到数组
    }
    seen = max; // 已经在k循环中遍历过的数字，在这里赋值给m
  }
  return arr;
}
let res = resNum(5);
res.forEach((el) => {
  console.log(el);
});
//         1***
//     3***    2***
// 4***    5***    6***
