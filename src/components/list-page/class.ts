export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
 }

interface ILinkedList<T> {
  append: (element: T) => void;
  /* insertInPosition: (element: T, position: number) => void; */
  getLength: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;
  private lastAddedNode: any;
  constructor(values: any = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.lastAddedNode = null; 
    for (let val of values) {
      this.append(val);
    }
  }
  prepend(value: any) {
    const newNode = new Node(value, this.head);

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
      this.length++;
    }
    this.length++;
    this.lastAddedNode = newNode;
    return this;
  }
  append(value: any) {
   
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    this.lastAddedNode = newNode;
    return this;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }
    let currentNode: any = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    this.length--;
    return deletedTail;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return deletedHead;
  }
  fromArray(values: any) {
    values.forEach((value: any) => this.append(value));
    return this;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  findByIndex(index: any) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current: any = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.value;
  }
  getLength() {
    return this.length;
  }
  getLastAddedNode(){
    return this.lastAddedNode
  }
  isEmpty() {
    return this.length === 0;
  }
  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
