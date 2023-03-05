# 树

## 广度遍历（dfs）和深度遍历(bfs)

### 广度遍历

广度遍历类似排队, 适用于层序遍历或者寻找最短路径的问。

```js
//bfs伪代码模版
function bfs(graph, start, end) {
  queue = []
  queue.append([start])
  visited.add(start)

  while (queue) node = queue.pop()
  visited.add(node)

  process(node)
  nodes = generate_related_nodes(node)
  queue.add(nodes)
}
```

### 深度遍历

深度遍历类似出入栈

```js
//dfs伪代码模版
//递归
dfs: function dfs(node, visited) {
  visited.add(node)

  for (next_node in node.children()) {
    if (!next_node in visited) dfs(next_node, visited)
  }
}

//非递归
function dfs(tree) {
  if (tree.root === null) {
    return []
  }

  visited, (stack = []), [tree.node]
  while (stack) node = stack.pop()
  visited.add(node)

  process(node)
  nodes = generate_ralated_nodes(node)
  stack.push(nodes)
}
```

## 堆

```js
var findKthLargest = function (nums, k) {
  let heapSize = nums.length
  buildMaxHeap(nums, heapSize) //构建大顶堆 大小为heapSize
  //大顶堆 前k-1个堆顶元素不断和数组的末尾元素交换 然后重新heapify堆顶元素
  //这个操作就是之前小顶堆出堆顶的操作，只不过现在是原地排序
  for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
    swap(nums, 0, i) //交换堆顶和数组末尾元素
    --heapSize //堆大小减1
    maxHeapify(nums, 0, heapSize) //重新heapify
  }
  return nums[0] //返回堆顶元素，就是第k大的元素

  function buildMaxHeap(nums, heapSize) {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      //从第一个非叶子节点开始构建
      maxHeapify(nums, i, heapSize)
    }
  }
  // 从左向右，自上而下的调整节点
  function maxHeapify(nums, i, heapSize) {
    let l = i * 2 + 1 //左节点
    let r = i * 2 + 2 //右节点
    let largest = i
    if (l < heapSize && nums[l] > nums[largest]) {
      largest = l
    }
    if (r < heapSize && nums[r] > nums[largest]) {
      largest = r
    }
    if (largest !== i) {
      swap(nums, i, largest) //找到左右节点中大的元素交换
      //递归交换后面的节点
      maxHeapify(nums, largest, heapSize)
    }
  }

  function swap(a, i, j) {
    //交换函数
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
}
```

**树开发经验**

为了方便起见，开发的时候经常增加tree查找，更新相关的获取方法

**方便的方法**

查找的方法可以使用事先生成map，可以根据节点的id查找子节点，根据pid查父节点，主要必须保证数据是响应式的，保证新增的节点能重新生成map

扁平化树： map: {[(id || parent)]: [node || children]}， 

parentMap： 用于展示, 

idMap： 用于查找，索引？

新增修改删除编辑节点

建树及树的遍历有几种方法：广度遍历 bps，队列；深度遍历 dps 栈遍历，递归

在遍历树时建议遍历节点，非节点child



