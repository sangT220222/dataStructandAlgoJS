class HashMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.loadFactor = 0.75; //good practice is to have loadfactor between 0.75 and 1
    this.hashMap = new Array(capacity); //setting hashmap as an array
  }
  hash(key) {
    // Convert key to string if it's not already a string
    key = typeof key === "string" ? key : key.toString();

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i); //charCodeAt() returns unicode value of specified character
    }

    return hashCode;
  }

  set(key, value) {
    //set value based on key
    const hashedKey = this.hash(key);

    if (this.hashMap[hashedKey] !== undefined) {
      console.log(`Collision detected for ${key}`);
    }
    //for now this has been set to overwrite the existing value with the new value for now
    this.hashMap[hashedKey] = { key, value };
  }

  get(key) {
    try {
      const hashedKey = this.hash(key);
      return this.hashMap[hashedKey].value;
    } catch (error) {
      return null;
    }
  }

  has(key) {
    const hashedKey = this.hash(key);

    return this.hashMap[hashedKey] !== undefined;
  }

  remove(key) {
    const hashedKey = this.hash(key);
    if (this.hashMap[hashedKey] === undefined) {
      return false;
    }
    delete this.hashMap[hashedKey];
    return "Key has been deleted!";
  }

  length() {
    let count = 0;
    for (const key in this.hashMap) {
      count += 1;
    }

    return count;
  }

  clear() {
    this.hashMap = new Array(this.capacity);
  }

  keys() {
    const keysArr = [];
    for (const key in this.hashMap) {
      keysArr.push(this.hashMap[key].key);
    }
    return keysArr;
  }
  values() {
    const valsArr = [];
    for (const key in this.hashMap) {
      valsArr.push(this.hashMap[key].value);
    }
    return valsArr;
  }

  entries() {
    const entries = [];
    for (const key in this.hashMap) {
      entries.push([this.hashMap[key].key, this.hashMap[key].value]);
    }
    return entries;
  }
}

// entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

const testingMap = new HashMap(10); //creating a new hashmap
testingMap.set(8, "value1");
testingMap.set(69, "value2");
console.log(testingMap);
console.log(testingMap.has(8));
console.log(testingMap.remove(3443));
// testingMap.clear();

console.log(testingMap.keys());
console.log(testingMap.values());
console.log(testingMap.entries());
