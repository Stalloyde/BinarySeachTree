#!/usr/bin/node

function NodeFactory(value, left = null, right = null) {
  value = value;
  return { value, left, right };
}

function Tree(array) {
  function buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = NodeFactory(array[mid]);
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);
    return root;
  }

  const sortedArray = array.sort((a, b) => a - b);
  const finalArray = [...new Set(sortedArray)];
  let rootNode = buildTree(finalArray, 0, finalArray.length - 1);

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

  function isBalanced() {
    return height(rootNode);
  }
  //return max height of left subtree
  // return max height of right subtree
  //if left subtree - right subtree > 1 return false, else return true

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
  };
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(array);

// function doubleUpNode(parameter) {
//   return parameter * 2;
// }

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.rootNode);
console.log(tree.isBalanced());
