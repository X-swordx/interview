/* 
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。 
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
  const res = [], path = []
  backtrack(nums, nums.length, [])
  return res
  function backtrack(n, k, used) {
      if(path.length === k) {// -->递归终止条件
          res.push(Array.from(path));
          return;
      }
      for (let i = 0; i < k; i++ ) {
          if(used[i]) continue;//已经使用过了就跳过本轮循环
          path.push(n[i]); // --> 做选择
          used[i] = true; 
          backtrack(n, k, used);// ---> 递归
          path.pop();//回溯 将push进的元素pop出来 然后标记成未使用 继续其他分支-->撤销选择
          used[i] = false;
      }
  }
};

console.log(permute([1,2,3]));