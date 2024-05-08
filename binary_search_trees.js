class Node{
  constructor(data, left = null , right = null){
    this.data = data;
    this.left = left;
    this.right = right;  
  }
  
}

class Tree {
  constructor(array){
    this.rootNode = this.buildTree(array);
  }

  buildTree(array){
    // Step 1: Sort the array and remove duplicates
    if(array.length === 0){
      return null;
    }
    const sortedUniqueArr = Array.from(new Set(array.sort((a,b) => a-b)));
   
    // Step 2: Construct a balanced binary tree
    //find the middle element of the array and make it the root of the tree, 
    //then perform the same operation on the left subarray for the root’s left child 
    //and the same operation on the right subarray for the root’s right child.
    const middle = parseInt(sortedUniqueArr.length/2); // slicing the array in half initially

    const root = new Node(sortedUniqueArr[middle], this.buildTree(sortedUniqueArr.slice(0,middle)), this.buildTree(sortedUniqueArr.slice(middle+1)));

    return root;
  }

  prettyPrint(node = this.rootNode, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== undefined) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

test.prettyPrint()
