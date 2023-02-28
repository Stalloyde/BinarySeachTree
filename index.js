#!/usr/bin/node

function NodeFactory(value, left = null, right = null) {
  value = value;
  return { value, left, right };
}

function Tree() {
  function buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = NodeFactory(array[mid]);
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);
    return root;
  }
  return { buildTree };
}

function sortArray() {
  const sortedArray = array.sort((a, b) => a - b);
  const finalArray = [...new Set(sortedArray)];
  return finalArray;
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const finalArray = sortArray(array);

const tree = Tree().buildTree(finalArray, 0, finalArray.length - 1);
console.log(tree);
