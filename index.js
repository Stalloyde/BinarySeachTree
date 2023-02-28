#!/usr/bin/node

function NodeFactory(value, left = null, right = null) {
  value = value;
  return { value, left, right };
}

function Tree(array) {
  const root = buildTree(array, 0, array.length - 1);
  return root;
}

function buildTree(array, start, end) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = NodeFactory(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);
  return root;
}

function sortArray() {
  const sortedArray = array.sort((a, b) => a - b);
  const finalArray = [...new Set(sortedArray)];
  return finalArray;
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const finalArray = sortArray(array);

const tree = Tree(finalArray);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree);
