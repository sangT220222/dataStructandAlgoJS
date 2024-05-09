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

  insert(value, node = this.rootNode){
    //need a base case as this will be recursion
    if(node === null){
      //insert here 
      return new Node(value);
    }
    //compare value with root node first
    if(value > node.data){
      //go to the right
      node.right = this.insert(value, node.right);
    }else if(value < node.data){
      //go to the left
      node.left = this.insert(value, node.left);
    }

    return node;
  }

  deleteNode(value,node){
    //base case
    if(node === null){
      return node;
    }

    //traverse the tree
    if(value > node.data){
      node.right = this.deleteNode(value, node.right);
    }
    else if(value < node.data){
      node.left = this.deleteNode(value, node.left);
    }
    else{ //where we have spotted the node in the tree
      //case 1 & 2- node has no child or one child
      if(node.left === null) {
        return node.right; //returning the child of the node effectively deletes the parent node
      }
      else if(node.right === null){
        return node.left;
      }
      //case 3 - when node have 2 children
    }
    
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
test.insert(69)
test.prettyPrint()
