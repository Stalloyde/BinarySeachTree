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

  function deleteNode(root, value) {
    if (root === null) return root;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    }

    if (value > root.value) {
      root.right = deleteNode(root.right, value);
    }

    if (Value === root.value) {
      if (root.right === null && root.left === null) {
        return null;
      } else if (root.left !== null && root.right === null) {
        return root.left;
      } else if (root.left === null && root.right !== null) {
        return root.right;
      } else {
        const minValue = findMinValue(root.right).value;
        root.value = minValue;
        root.right = deleteNode(root.right, minValue);
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
  return { rootNode, insert, deleteNode };
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = Tree(array);
tree.deleteNode(tree.rootNode, 8);

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
