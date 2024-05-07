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
}

// length() returns the number of stored keys in the hash map.

// clear() removes all entries in the hash map.

// keys() returns an array containing all the keys inside the hash map.

// values() returns an array containing all the values.

const testingMap = new HashMap(10); //creating a new hashmap
testingMap.set(8, "value1");
testingMap.set(69, "value2");
console.log(testingMap);
console.log(testingMap.has(8));
console.log(testingMap.remove(3443));
console.log(testingMap);
