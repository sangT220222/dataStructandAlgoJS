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

    this.hashMap[hashedKey] = { key, value };
  }
}

const testingMap = new HashMap(10); //creating a new hashmap
testingMap.set(8, "old value");
testingMap.set(8, "new value");
console.log(testingMap);
