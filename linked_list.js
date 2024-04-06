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

  insertNode(value) {
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
}

let list = new LinkedList();
list.insertNode(3);
list.insertNode(69);

list.displayList();
