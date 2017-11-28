function Node(key, value) {
    this.key = key;
    this.value = value;
    
    //please don't rename left, right, key, value and root properties
    this._left = undefined; //Empty children link for new node
    this._right = undefined; //Empty children link for new node
}

function BinarySearchTree() {
    this._root = undefined;
}

BinarySearchTree.prototype.insert = function(key, value){
  
  var newNode = new Node(key, value); 

  if(this._root == undefined){
      this._root = newNode;
  } else {          
    this.insertNewNodeToCorrectParent(newNode, this._root);
  }
  return this;
}

BinarySearchTree.prototype.insertNewNodeToCorrectParent = function(newNode, potentialParent) {
  if(newNode.key < potentialParent.key ) {
                  if(potentialParent._left == undefined ) { 
                    potentialParent._left = newNode; 
                  } else { 
                    this.insertNewNodeToCorrectParent(newNode, potentialParent._left); 
                  } 
  } else if(newNode.key > potentialParent.key){
                 if(potentialParent._right == undefined ) { 
                    potentialParent._right = newNode; 
                  } else { 
                    this.insertNewNodeToCorrectParent(newNode, potentialParent._right); 
                  } 
  }
}
BinarySearchTree.prototype.count = function() {
  if(this._root == undefined) {
    return 0;
  }
  return this.countForNode(this._root);
}

BinarySearchTree.prototype.countForNode = function(currentNode) {
  var leftCount = 0;
  if(currentNode._left != undefined) {
    leftCount = this.countForNode(currentNode._left);
  }
  var rightCount = 0;
  if(currentNode._right != undefined) {
    rightCount = this.countForNode(currentNode._right);
  }
  return 1 + leftCount + rightCount;
}

BinarySearchTree.prototype.printAll = function() {
  if(this._root == undefined) {
    return;
  }
  this.printEachNode(this._root);

}
BinarySearchTree.prototype.printEachNode = function(currentNode) {

  console.log(currentNode);

  if(currentNode._left != undefined) {
    this.printEachNode(currentNode._left);
  }
  if (currentNode._right != undefined) {
    this.printEachNode(currentNode._right);
  }
}

BinarySearchTree.prototype.delete = function (key) {
  if (this.search(key, 1) == undefined) {
    return;
  }

 if ( this._root.key == key) {
    var leftLeft = this._root._left;
    var rightRight = this._root._right; 
     var x = this.searchParentByKey(this.searchMin(this._root._right).key)
    this._root = this.searchMin(this._root._right);
    x._left = undefined;
    this._root._left = leftLeft;
    this._root._right = rightRight;


    return;
  }
  
  if (key < this.searchParentByKey(key).key) {  


   // идем влево 
    if (this.search(key, 1)._left == undefined && this.search(key, 1)._right == undefined) {
      this.searchParentByKey(key)._left = undefined;
      return this;
    }
    if (this.search(key, 1)._left == undefined && this.search(key, 1)._right != undefined)  { // если у удоляемого один ребенок справа
      this.searchParentByKey(key)._right = this.search(key, 1)._right;
      return this;
    }
    if (this.search(key, 1)._left != undefined && this.search(key, 1)._right == undefined)  { // если у удоляемого один ребенок слева
      this.searchParentByKey(key)._left = this.search(key, 1)._left;
      return this;
    }    
   /* if (this.search(key, 1)._left != undefined && this.search(key, 1)._right != undefined) {
     this.searchParentByKey(key)._left = this.searchMin(this.search(key, 1)._right);
     this.searchMin(this.search(key, 1)._right)._left = this.search(key, 1)._left; 
     this.searchMin(this.search(key, 1)._right)._left = this.search(key, 1)._right;   

    } */
 


  } else {




    if (this.search(key, 1)._left == undefined && this.search(key, 1)._right == undefined) { // если у удоляемого нету детей
      this.searchParentByKey(key)._right = undefined;
      return this;
    }
    if (this.search(key, 1)._left == undefined && this.search(key, 1)._right != undefined)  { // если у удоляемого один ребенок справа
      this.searchParentByKey(key)._right = this.search(key, 1)._right;
      return this;
    }
    if (this.search(key, 1)._left != undefined && this.search(key, 1)._right == undefined)  { // если у удоляемого один ребенок слева
      this.searchParentByKey(key)._left = this.search(key, 1)._left;
      return this;
    }    
  }
 return this;
}



BinarySearchTree.prototype.searchParentByKey = function(key) {
  if(this._root.key == key) return "root";
  return this.searchParentByKeyRecursion(this._root, key);
}


BinarySearchTree.prototype.searchParentByKeyRecursion = function(currentNode, key) {
  if ( key < currentNode.key) {
      if(currentNode._left == undefined) return undefined;
      if(currentNode._left.key == key) return currentNode;
      return this.searchParentByKeyRecursion(currentNode._left, key); 
  } else {
     if(currentNode._right == undefined) return undefined;
     if(currentNode._right.key == key) return currentNode;
     return this.searchParentByKeyRecursion(currentNode._right, key);   
  }
}

BinarySearchTree.prototype.searchParentByKeyRecursion1111 = function(currentNode, key) {
  if ( key < currentNode.key && currentNode._left == undefined) {
    return undefined;
  }
  if (key > currentNode.key && currentNode._right == undefined) {
    return undefined;
  }
  if(currentNode._right.key == key) {
    return currentNode;
  }
  if (currentNode._left.key == key) {
    return currentNode;
  }
  if (key < currentNode.key) {
    return this.searchParentByKeyRecursion(currentNode._left, key);
  } else {
    return this.searchParentByKeyRecursion(currentNode._right, key);
  }
}

BinarySearchTree.prototype.min = function(key) {
  var currentNode = this.search(key, 1);
  if(currentNode._left != undefined) {
    return this.searchMin(currentNode._left);
  }
  return currentNode;
}
BinarySearchTree.prototype.searchMin = function(currentNode) {
  if (currentNode._left != undefined) {
    return this.searchMin(currentNode._left);
  }
  return currentNode;
}


BinarySearchTree.prototype.max = function(key) {
  var currentNode = this.search(key, 1);
  if(currentNode._right != undefined) {
    return this.searchMax(currentNode._right);
  }
  return currentNode;  
}
BinarySearchTree.prototype.searchMax = function(currentNode) {
  if (currentNode._right != undefined) {
    return this.searchMax(currentNode._right);
  }
  return currentNode;  
}





BinarySearchTree.prototype.search = function(key, x) {
  if(this._root == undefined) {
    return undefined;
  }
  return this.searchInAllTree(this._root, key, x);
}
BinarySearchTree.prototype.searchInAllTree = function(currentNode, key, x) {
  if (currentNode == undefined) {
    return undefined;
  }
  if(key < currentNode.key ) {
    return this.searchInAllTree(currentNode._left, key, x);
    
  } 

  if(key > currentNode.key) {
    return this.searchInAllTree(currentNode._right, key, x);
    
  }
  if (key == currentNode.key) {
    if (x == undefined) return  currentNode.value; 
    if (x == 1) return currentNode;
  }
  
}
BinarySearchTree.prototype.contains = function(value) {
  if (this._root == undefined) {
    return false;
  }
   this.arrNodeKey = [];
  return this.checkValueInAllTree(this._root, value);
}
BinarySearchTree.prototype.checkValueInAllTree = function(currentNode, value) {
  var arrKeyLength = this.traverseArr(currentNode).length;
  for (var i = 0; i < arrKeyLength; i++) {
    if (this.search(this.traverseArr(currentNode)[i]) == value) {
      return true;
    }
  }

  return false;

}
BinarySearchTree.prototype.traverseArr = function(currentNode) {
  
  this.arrNodeKey.push(currentNode.key);

  if (currentNode._left != undefined) {
    this.traverseArr(currentNode._left);
  } 
  if (currentNode._right != undefined) {
    this.traverseArr(currentNode._right);
  } 

  return this.arrNodeKey;


}

BinarySearchTree.prototype.traverse = function(boolean) {
  
  this.arrNodeKey = [];
this.traverseArr(this._root);
  

 var arrValue = [];
  
  var order = function(arr, x, y) {
    function compareNumeric(a, b) {
      if (a > b) return x;
      if (a < b) return y;
    } 
  return arr.sort(compareNumeric);
  }

  if(boolean) {
    var trueKeyOrder =  order(this.arrNodeKey, 1, -1);
    for(i = 0; i < trueKeyOrder.length; i++ ) {
      arrValue.push(this.search(trueKeyOrder[i]));
    }
    return  arrValue;
  
  } else {
    var falseKeyOrder = order(this.arrNodeKey, -1, 1); 
    for(i = 0; i < falseKeyOrder.length; i++ ) {
      arrValue.push(this.search(falseKeyOrder[i]));
    }
    return  arrValue;    
    
  }

}

BinarySearchTree.prototype.verify = function() {
  if(this._root.key < this._root._left.key || this._root.key > this._root._right.key ) {
    return false;
  } 
  return true;
}


BinarySearchTree.prototype.root = function() {
  if (this._root == undefined) return undefined;
  return this._root.value;
}
  
 
module.exports = {
  //BST class
  BinarySearchTree,
  //root name
  root: '_root',
  //left and right nodes
  left: '_left',
  right: '_right',
  student: 'Aleksey Budanov'
};  