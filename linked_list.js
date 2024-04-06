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
}

let list = new LinkedList();
list.appendNode(3);
list.appendNode(69);

list.displayList();

list.prependNode(77);
list.displayList();