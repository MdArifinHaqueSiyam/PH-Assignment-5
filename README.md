Programming Hero Web Development 
Batch 13
Assignment 5

Question and Answer:


#Question no 1: What is the difference between var, let, and const?
Answer:
The differences between var, let and const are given below:
(i) var: Works anywhere in a function. We can change it and make it again.
(ii) let: Works only inside {}. We can change it but not make it again.
(iii) const: Works only inside {}. We cannot change it or make it again. We must give it a value right away.



#Question no 2: What is the spread operator (...)?
Answer:
The spread operator (...) expands elements from an array, object, or iterable into individual items.
Example:
const arr = [1, 2];
const newArr = [...arr, 3, 4];



#Question no 3: What is the difference between map(), filter(), and forEach()?
Answer:
(i) map(): Returns a new array by transforming each element.
(ii) filter(): Returns a new array with elements that pass a condition.
(iii) forEach(): Returns nothing, just loops through the array.




#Question no 4: What is an arrow function?
Answer:
Arrow function is a shorter way to write functions. It does not have its own this, arguments, and cannot be used as a constructor. It uses the => symbol.
Example:
const add = (a, b) => a + b;




#Question no 5: What are template literals?
Answer:
Template literals are strings written inside backticks (`). They allow:
(i) Variables with ${}
(ii) Multi-line strings
Example:
const name = "John";
const text = `Hello ${name}! 
How are you?`;