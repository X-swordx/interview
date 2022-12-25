const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 5, 15]

function less (a, b) {
  return a - b < 0
}

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
// 冒泡排序--时间复杂度 n^2
function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (less(arr[j + 1], arr[j])) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
// 选择排序--时间复杂度 n^2
function selectionSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (less(arr[j], arr[min])) {
        min = j
      }
    }
    swap(arr, min, i)
  }
  return arr
}
// 插入排序--时间复杂度 n^2
function insertionSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (less(arr[j], arr[j - 1])) {
        swap(arr, j, j - 1)
      } else {
        break
      }
    }
  }
  return arr
}
// 归并排序--时间复杂度 nlog(n)
function mergeSort (arr) {
  if (arr.length < 2) return arr
  let low = 0
  let high = arr.length
  let mid = Math.floor((low + high) / 2)
  let left = arr.slice(low, mid)
  let right = arr.slice(mid, high)
  return merge(mergeSort(left), mergeSort(right))
}
function merge (left, right) {
  let result = []
  while(left.length && right.length) {
    if (less(left[0], right[0])) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}
// 快排--时间复杂度 nlogn ~ n^2 之间
function quickSort(arr) {
  sort(arr, 0, arr.length - 1)
  return arr
}
function sort (arr, low, high) {
  if (low >= high) return
  let j = partion(arr, low, high)
  sort(arr, low, j - 1)
  sort(arr, j + 1, high)
}
function partion (arr, low, high) {
  let i = low
  let j = high + 1
  while (true) {
    // 从左到右找到第一个比 low 大的元素
    while (less(arr[++i], arr[low])) {
      if (i >= high) break
    }
    // 从右到左找到第一个比 low 小的元素
    while (less(arr[low], arr[--j])) {
      if (j <= low) break
    }
    // 如果 i 和 j 已经交叉了，跳出循环
    if (i >= j) break
    // 如果 i 和 j 没有交叉，交换 i 和 j 对应的元素
    swap(arr, i, j)
  }
  swap(arr, low, j)
  return j
}
// console.log(quickSort(arr))

// 二分查找--时间复杂度 log2(n)
// 题目描述:如何确定一个数在一个有序数组中的位置
function search(arr, target, start, end) {
  let targetIndex = -1;

  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    targetIndex = mid;
    return targetIndex;
  }

  if (start >= end) {
    return targetIndex;
  }

  if (arr[mid] < target) {
    return search(arr, target, mid + 1, end);
  } else {
    return search(arr, target, start, mid - 1);
  }
}
// const dataArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const position = search(dataArr, 6, 0, dataArr.length - 1);
// if (position !== -1) {
//   console.log(`目标元素在数组中的位置:${position}`);
// } else {
//   console.log("目标元素不在数组中");
// }
