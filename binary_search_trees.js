class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.rootNode = this.buildTree(array);
  }

  buildTree(array) {
    // Step 1: Sort the array and remove duplicates
    if (array.length === 0) {
      return null;
    }
    const sortedUniqueArr = Array.from(new Set(array.sort((a, b) => a - b)));

    // Step 2: Construct a balanced binary tree
    //find the middle element of the array and make it the root of the tree,
    //then perform the same operation on the left subarray for the root’s left child
    //and the same operation on the right subarray for the root’s right child.
    const middle = parseInt(sortedUniqueArr.length / 2); // slicing the array in half initially

    const root = new Node(
      sortedUniqueArr[middle],
      this.buildTree(sortedUniqueArr.slice(0, middle)),
      this.buildTree(sortedUniqueArr.slice(middle + 1))
    );

    return root;
  }

  insert(value, node = this.rootNode) {
    //need a base case as this will be recursion
    if (node === null) {
      //insert here
      return new Node(value);
    }
    //compare value with root node first
    if (value > node.data) {
      //go to the right
      node.right = this.insert(value, node.right);
    } else if (value < node.data) {
      //go to the left
      node.left = this.insert(value, node.left);
    }

    return node;
  }

  deleteNode(value, node = this.rootNode) {
    //base case
    if (node === null) {
      return node;
    }

    //traverse the tree
    if (value > node.data) {
      node.right = this.deleteNode(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteNode(value, node.left);
    } else {
      //where we have spotted the node in the tree
      //case 1 & 2- node has no child or one child
      if (node.left === null) {
        return node.right; //returning the child of the node effectively deletes the parent node
      } else if (node.right === null) {
        return node.left;
      }
      //case 3 - when node have 2 children, getting the inorder sucessor
      //node.right as the next minimum value after the node will be found in the right subtree!
      let sucessor = this.findMin(node.right);
      node.data = sucessor.data; //replace with the next minimum value
      node.right = this.deleteNode(sucessor.data, node.right);
    }

    return node;
  }

  findMin(node) {
    //finding the minimum child of a node
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, currentNode = this.rootNode) {
    if (currentNode === null) {
      return "Value not inside the tree";
    }

    if (currentNode.data === value) {
      return "Value found in the tree";
    }

    //binary search
    if (value > currentNode.data) {
      return this.find(value, currentNode.right);
    } else if (value < currentNode.data) {
      return this.find(value, currentNode.left);
    }
  }

  levelOrder(callback) {
    //initialise an empty queue and empty array for results
    if (!this.rootNode) return "Empty";
    var queue = [this.rootNode];
    var traversedNodes = [];

    //go through queue till it's not empty
    while (queue.length !== 0) {
      const node = queue.shift(); // Dequeue node
      if (!callback) {
        callback(node);
      } else {
        traversedNodes.push(node);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    //do recursion here

    return traversedNodes;
  }

  inOrder(callback, node = this.rootNode) {
    var traversedNodes = [];
    //check if  node is empty -> return array
    if (!node) return traversedNodes;

    //traverse left subtree recursively
    traversedNodes.push(...this.inOrder(callback, node.left));

    traversedNodes.push(node);

    if (callback) callback(node);

    //traverse right subtree recursively
    traversedNodes.push(...this.inOrder(callback, node.right));

    if (!callback) return traversedNodes;
  }

  preOrder(callback, node = this.rootNode) {
    var traversedNodes = [];
    //check if  node is empty -> return array
    if (!node) return traversedNodes;

    traversedNodes.push(node);
    if (callback) callback(node);

    //traverse left subtree recursively
    traversedNodes.push(...this.preOrder(callback, node.left));

    //traverse right subtree recursively
    traversedNodes.push(...this.preOrder(callback, node.right));

    if (!callback) return traversedNodes;
  }

  postOrder(callback, node = this.rootNode) {
    var traversedNodes = [];
    //check if  node is empty -> return array
    if (!node) return traversedNodes;
    //traverse left subtree recursively
    traversedNodes.push(...this.postOrder(callback, node.left));

    if (callback) callback(node);

    //traverse right subtree recursively
    traversedNodes.push(...this.postOrder(callback, node.right));

    traversedNodes.push(node);

    if (!callback) return traversedNodes;
  }

  prettyPrint(node = this.rootNode, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== undefined) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test.insert(69);
test.deleteNode(67);
test.prettyPrint();

console.log(test.find(69));
console.log(test.find(1000));

console.log("In-order traversal without callback:", test.inOrder());
console.log("Pre-order traversal without callback:", test.preOrder());
console.log("Post-order traversal without callback:", test.postOrder());
