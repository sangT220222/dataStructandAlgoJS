class createNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  displayList() {
    let current = this.head;
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }

  appendNode(value) {
    let node = new createNode(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
  }

  prependNode(value) {
    let node = new createNode(value);
    node.next = this.head;
    this.head = node;
  }

  sizeOfList() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  headOfList() {
    return this.head.value;
  }

  tailOfList() {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    return current.value;
  }

  getNodeAt(index) {
    let current = this.head;
    try {
      for (let i = 1; i <= index; i++) {
        current = current.next;
      }
    } catch (error) {
      return "No node at this index";
    }
    if (current === null) {
      return "No node at this index";
    }
    return current.value;
  }

  popNode() {
    if (!this.head.next) {
      this.head = null;
    }
    let prevNode = null;
    let current = this.head;

    while (current.next !== null) {
      prevNode = current;
      current = current.next;
    }
    prevNode.next = null;
  }

  containsValue(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  findValue(value) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.next;
    }
  }

  toString() {
    let current = this.head;
    let string = "";
    while (current !== null) {
      string += "(" + current.value + ")";
      if (current.next !== null) {
        string += "->";
      }
      current = current.next;
    }
    return string;
  }
}

let list = new LinkedList();
list.appendNode(3);
list.appendNode(69);
list.appendNode(88);
list.prependNode(77);
console.log(list.toString());

// list.displayList();

// console.log(list.sizeOfList());

// console.log("Head of List:" + list.headOfList());
// console.log("Tail of List:" + list.tailOfList());
// console.log(list.getNodeAt(3));
list.popNode();
console.log("Last node removed");
// console.log(list.containsValue(3));
// console.log(list.findValue(69));
console.log(list.toString());
