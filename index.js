#!/usr/bin/node

function NodeFactory(value, left = null, right = null) {
  value = value;
  return { value, left, right };
}

function Tree(parameter) {
  function buildTree(parameter, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = NodeFactory(parameter[mid]);
    root.left = buildTree(parameter, start, mid - 1);
    root.right = buildTree(parameter, mid + 1, end);
    return root;
  }

  function sortArray(parameter) {
    const sortedArray = parameter.sort((a, b) => a - b);
    const finalArray = [...new Set(sortedArray)];
    return finalArray;
  }
  let rootNode = buildTree(
    sortArray(parameter),
    0,
    sortArray(parameter).length - 1
  );

  function insert(root, value) {
    if (root === null) {
      const newNode = NodeFactory(value);
      root = newNode;
      return root;
    }

    if (value < root.value) {
      root.left = insert(root.left, value);
    }

    if (value > root.value) {
      root.right = insert(root.right, value);
    }
    return root;
  }

  function del(root, value) {
    if (root === value) return root;

    if (value < root.value) {
      root.left = del(root.left, value);
    }

    if (value > root.value) {
      root.right = del(root.right, value);
    }

    if (value === root.value) {
      if (root.right === null && root.left === null) {
        return null;
      } else if (root.left !== null && root.right === null) {
        return root.left;
      } else if (root.left === null && root.right !== null) {
        return root.right;
      } else {
        const minValue = findMinValue(root.right).value;
        root.value = minValue;
        root.right = del(root.right, minValue);
      }
    }

    function findMinValue(root) {
      if (root.left === null) {
        return root;
      }
      return findMinValue(root.left);
    }
    return root;
  }

  function find(root, value) {
    if (root === null) {
      return 'none';
    }
    if (root === value) {
      return root.value;
    }
    if (value > root.value) {
      return find(root.right, value);
    }
    if (value < root.value) {
      return find(root.left, value);
    }

    return root;
  }

  function levelOrder(root, queue = [root], callback, nodeArray = []) {
    if (!queue.length || !root) {
      return;
    }

    if (root.left !== null && root.right !== null) {
      queue.push(root.left, root.right);
    }

    if (root.left !== null && root.right === null) {
      queue.push(root.left);
    }

    if (root.left === null && root.right !== null) {
      queue.push(root.right);
    }

    const node = queue.shift().value;
    const newRoot = queue[0];
    if (callback) {
      nodeArray.push(callback(node));
    } else {
      nodeArray.push(node);
    }
    levelOrder(newRoot, queue, callback, nodeArray);
    return nodeArray;
  }

  function inorder(root, callback, nodeArray = []) {
    if (!root) return;
    inorder(root.left, callback, nodeArray);

    if (callback) {
      nodeArray.push(callback(root.value));
    } else {
      nodeArray.push(root.value);
    }
    inorder(root.right, callback, nodeArray);
    return nodeArray;
  }

  function preorder(root, callback, nodeArray = []) {
    if (!root) return;

    if (callback) {
      nodeArray.push(callback(root.value));
    } else {
      nodeArray.push(root.value);
    }
    preorder(root.left, callback, nodeArray);
    preorder(root.right, callback, nodeArray);
    return nodeArray;
  }

  function postorder(root, callback, nodeArray = []) {
    if (!root) return;

    postorder(root.left, callback, nodeArray);
    postorder(root.right, callback, nodeArray);

    if (callback) {
      nodeArray.push(callback(root.value));
    } else {
      nodeArray.push(root.value);
    }
    return nodeArray;
  }
  function height(root) {
    if (!root) return -1;
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(root, node) {
    if (!root) return -1;

    if (root === node) {
      return 0;
    }

    let leftDepth = depth(root.left, node);
    let rightDepth = depth(root.right, node);

    if (leftDepth !== -1) {
      return leftDepth + 1;
    } else if (rightDepth !== -1) {
      return rightDepth + 1;
    } else {
      return -1;
    }
  }

  function insertNode(value) {
    insert(rootNode, value);
  }

  function deleteNode(value) {
    del(rootNode, value);
  }

  function findNode(value) {
    return find(rootNode, value);
  }

  function levelOrderNode(callback) {
    return levelOrder(rootNode, undefined, callback);
  }

  function inorderNode(callback) {
    return inorder(rootNode, callback);
  }

  function preorderNode(callback) {
    return preorder(rootNode, callback);
  }

  function postorderNode(callback) {
    return postorder(rootNode, callback);
  }

  function heightNode(node) {
    return !node ? height(rootNode) : height(findNode(node));
  }

  function depthNode(node, root = rootNode) {
    return !node ? depth(rootNode, rootNode) : depth(rootNode, findNode(node));
  }

  function isBalanced(root = rootNode) {
    if (!root) return 0;

    const leftHeight = isBalanced(root.left);
    const rightHeight = isBalanced(root.right);

    if ((leftHeight > 0 || rightHeight > 0) && root.value === rootNode.value) {
      const difference = Math.abs(leftHeight - rightHeight);
      return difference < 1 ? 'Balanced' : 'Not Balanced';
    } else {
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  function rebalance(root = rootNode, rebalanceArray = []) {
    if (!root) {
      rootNode = buildTree(sortArray(array), 0, sortArray(array).length - 1);
      return rootNode;
    }

    rebalanceArray.push(root.value);
    rebalance(root.left, rebalanceArray);
    rebalance(root.right, rebalanceArray);
    return rootNode;
  }

  return {
    rootNode,
    insertNode,
    deleteNode,
    findNode,
    levelOrderNode,
    inorderNode,
    preorderNode,
    postorderNode,
    heightNode,
    depthNode,
    isBalanced,
    rebalance,
  };
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(array);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

tree.insertNode(10);
prettyPrint(tree.rootNode);
console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.rootNode);
console.log(tree.isBalanced());

//Tree.buildTree(array)
//insertNode(10)
//rebalance()
