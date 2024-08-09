/*! *****************************************************************************
Copyright (c) JubbyTech Sofwares. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/**
 * sniper.js
 * Version: 1.8.0
 */

/**
 * This function generates an array of years between a given start and end date.
 *
 * @param {number} [startDate=1850] - The start year. Default is 1850.
 * @param {number} [endDate=new Date().getFullYear()] - The end year. Default is the current year.
 *
 * @throws {Error} - Throws an error if the end date is less than the start date.
 *
 * @returns {number[]} - An array of years between the start and end date (inclusive).
 */
function getYears(startDate = 1850, endDate = new Date().getFullYear()) {
    if (startDate > endDate) throw new Error("End date cannot be less than start date");
    let years = [];
    while (startDate !== endDate + 1) {
        years.push(startDate);
        startDate++;
    }
    return years;
}

/**
 * This function returns an array of month names.
 *
 * @param {boolean} [short=false] - If true, returns short month names (e.g., 'Jan', 'Feb').
 *                                 If false, returns full month names (e.g., 'January', 'February').
 *                                 Default is false.
 *
 * @returns {string[]} An array of month names based on the provided parameter.
 */
function getMonths(short=false){ 
    return short?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:["January","February","March","April","May","June","July","August","September","October","November","December"];
}

/**
 * Returns an array of weekdays based on the provided parameter.
 *
 * @param {boolean} [short=false] - If true, returns the weekdays in short form (3 letters).
 *                                  If false, returns the weekdays in full form.
 *
 * @returns {string[]} An array of weekdays.
 *
 * @example
 * getWeekDays(); // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
 * getWeekDays(true); // ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 */
function getWeekDays(short=false){
    return short?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
}

/**
 * Checks if an object is empty.
 *
 * @returns {boolean} - Returns true if the object is empty, false otherwise.
 *
 * @example
 * const obj = {};
 * console.log(obj.isEmpty()); // Output: true
 *
 * const obj2 = { key: 'value' };
 * console.log(obj2.isEmpty()); // Output: false
 */
Object.prototype.isEmpty = function(){
    let x = [];
    for(key in this){
        if(Object.hasOwnProperty.apply(this,[key])){
             x.push(key);
        }
    }
    return x.length === 0 ?true:false;
}


/**
 * Converts the first character of each word in a string to uppercase and the rest to lowercase.
 *
 * @param {string} str - The string to be converted.
 * @returns {string} - The converted string.
 */
String.prototype.capitalizeFirstLetters =function(){ 
  return this.replace(/\w\S*/g, (s)=> s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
};

/**
 * Returns a string with the first character converted to uppercase and the rest of the string unchanged.
 *
 * @returns {string} A new string with the first character converted to uppercase.
 */
 String.prototype.capitalizeFirstLetter  = 
function(){ return this.charAt(0).toUpperCase() + this.slice(1);}
 
 

/**
 * Commarizes a given number by inserting commas every three digits.
 *
 * @param {number} num - The number to be commarized.
 * @returns {string} - The commarized number as a string.
 */
function commarize(num){
  let dec='';
  // Extract decimal part if exists
  dec = num.toString().search(/\./) > 0? '.'+num.split('.').at(-1):'';
  // Remove decimal part from the number
  num = num.toString().search(/\./) < 0? num.toString().split("") :num.toString().split(".")[0];
  let newnum=[], r=1;
  
  // Loop through the number string in reverse order
  for(let i=num.length-1;i>=0;i--){
      newnum.unshift(num[i])
      // Insert comma every three digits
      if(r%3===0 && i!=0)newnum.unshift(",");
      r++;
  }

  // Return the commarized number with decimal part if exists
  return dec.length<1 ?newnum.join(""):newnum.join("")+dec;
}
  

/**
 * 
 * @param {string} num  must be a string for best result
 * @param {string} currency  in words e.g(Naira, Dollars, Euro, Rands, Ruppees, ponds, cides)
 * @returns numbers in words
 */
function inWords(num,currency="") {
  let words="";
  let wordLookup = {
    once: ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    tens: ["","ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    teens: ["ten","eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
    units: [currency, "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septemdecillion", "octodecillion", "novemdecillion", "vigintillion","unvigintillion","duovigintillion", 
    "trevigintillion","quattuorvigintillion","quinvigintillion","sexvigintillion","septvigintillion","octovigintillion","nonvigintillion","trigintillion","untrigintillion","duotrigintillion"]
}

let digits = commarize(`${num}`).split(","), unit, rst;
  if(digits.length>1){
 console.log(digits)
    digits.forEach((hun, i, arr)=>{
        unit =  wordLookup.units[arr.length-i-1];
        switch (hun.length) {
            case 3:
                // console.log(hun)
                if(!hasLeadingZero(hun)){
          if(hasTailingZero(hun)){
            if(isHundreds(hun)){
                rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
                
            words+= wordLookup.once[hun[0]] + " hundred" + " " +rst+ " ";
            }else if(isTeens(hun[1]+hun[2])){
                rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];

              	words +=hun[2] == "0" ?wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]]: wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]] +" "+rst+" ";

            }else{
                rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
              words += wordLookup.once[hun[0]] + " hundred and "+ wordLookup.tens[hun[1]] + " "+rst+" "
            }
            
          }else if(hasZero(hun)){
            rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
             words+= wordLookup.once[hun[0]] + " hundred and "+ wordLookup.once[hun[2]] +" "+rst+" ";
          }else{
             if(isTeens(hun[1]+hun[2])){
                rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
              	words +=hun[2] == "0" ?wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]]: wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]] +" "+rst+" ";

            }else{
                rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
            words+= wordLookup.once[hun[0]] + " hundred and "+ wordLookup.tens[hun[1]] + "-" + wordLookup.once[hun[2]]+" "+rst+" ";
            }
          }
          }else{
          }
          words += wordLookup.once[hun[0]]+" "+wordLookup.once[hun[1]] +" "+wordLookup.once[hun[2]] +" ";
          
        break;
    case 2:
          if(hasLeadingZero(hun)){
            words += wordLookup.once[hun[0]] +" "+ wordLookup.once[hun[1]]+" "
          }else if(isTeens(hun)){
            rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
            words += hun[0] == "0" ?wordLookup.teens[hun[1]] : wordLookup.teens[hun[1]]+" "+rst+" ";
          }else{
            
            rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
    		words+=wordLookup.tens[hun[0]]+"-"+wordLookup.once[hun[1]]+" "+rst+" ";
          }
          
       break;
    case 1:
        rst = i===0?unit:wordLookup.units[wordLookup.units.indexOf(unit)];
       words+=wordLookup.once[hun[0]]+" "+rst+" ";
        break;
        

  }
  
    })
      
      
      

    
  }else{
  
    let hun = digits.at(-1).split("");
      switch (hun.length) {
    case 3:
          if(!hasLeadingZero(hun.join(""))){
          if(hasTailingZero(hun.join(""))){
            
            if(isHundreds(hun.join(""))){
              words= wordLookup.once[hun[0]] + " hundred";
            }else if(isTeens(hun[1]+hun[2])){
              	words =hun[2] == "0" ?wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]]: wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]];
              
            }else{
              words = wordLookup.once[hun[0]] + " hundred and "+ wordLookup.tens[hun[1]]
            }
            
          }else if(hasZero(hun.join(""))){
             words= wordLookup.once[hun[0]] + " hundred and "+ wordLookup.once[hun[2]];
          }else{
             if(isTeens(hun[1]+hun[2])){
              	words =hun[2] == "0" ?wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]]: wordLookup.once[hun[0]] + " hundred and "+ wordLookup.teens[hun[2]];

            }else{
            words= wordLookup.once[hun[0]] + " hundred and "+ wordLookup.tens[hun[1]] + "-" + wordLookup.once[hun[2]];
            }
          }
          }else{
            words = wordLookup.once[hun[0]]+" "+wordLookup.once[hun[1]] +" "+wordLookup.once[hun[2]]
          }
          
        break;
    case 2:
          if(hasLeadingZero(hun.join(""))){
            words = wordLookup.once[hun[0]] +" "+ wordLookup.once[hun[1]]
          }else if(isTeens(hun.join(""))){
            words = hun[0] == "0" ?wordLookup.teens[hun[1]] : wordLookup.teens[hun[1]];
          }else{
            
    		words=wordLookup.tens[hun[0]]+"-"+wordLookup.once[hun[1]];
          }
          
          
       break;
    case 1:
       words=wordLookup.once[hun[0]];
        break;
  }
  
  }

  
function hasLeadingZero(str){
  return str.toString()[0]=="0"?true:false;
}

function hasTailingZero(str){
  str = str.toString();
  return str[str.length-1]=="0"?true:false;
}

function hasZero(value){
  return value.toString().slice(1,-1)=="0"?true:false;
}

function isTeens(value){
  value=value.toString();
  if(value.length==2){
		return value[0]=="1"?true:false
  }
  return false;
}

function isHundreds(value){
  value=value.toString();
  if(value.length==3){
		return value.slice(1)=="00"?true:false
  }
  return false;
}

  return words;
}


/**
 * Shuffles the elements of the array in place.
 *
 * @returns {Array} The shuffled array.
 */
Array.prototype.shuffle = function() {
  let currentIndex = this.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex], this[currentIndex]];
  }

  return this;
};

/**
 * Moves the first element of the array to the end of the array.
 *
 * @returns {Array} The modified array.
 */
Array.prototype.moveBackward = function() {
  this.push(this.shift());
  return this;
};

/**
 * Moves the first element of the array to the end of the array.
 *
 * @returns {Array} The modified array.
 */
Array.prototype.moveForward = function(){
  this.unshift(this.pop());
  return this;
}

/**
 * Creates a new HTML element and appends it to the specified parent element.
 *
 * @param {Object} el - An object representing the attributes and properties of the new element.
 * @param {HTMLElement} parent - The parent element to which the new element will be appended.
 * @param {boolean} [prepend=false] - A flag indicating whether the new element should be prepended to the parent element.
 * @returns {HTMLElement} - The newly created and appended element.
 *
 * @example
 * const newElement = createElement(
 *   {
 *     nodeName: 'div',
 *     textContent: 'Hello world',
 *   },
 *   root
 * );
 */
function createElement(el, parent, prepend = false){
  const { nodeName = 'div', ...attrs } = el;
  const element = document.createElement(nodeName);
  Object.entries(attrs).forEach(([attr, value]) => {
    element[attr] = value;
  });
  prepend ? parent.prepend(element) : parent.append(element);

  return element;
};

/**
 * Checks if a given string is a valid JSON string.
 *
 * @param {string} str - The string to be checked.
 * @returns {boolean} - True if the string is a valid JSON string, false otherwise.
 */
function IsJsonString(str){
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

/**
 * Checks if a given object is empty or not.
 *
 * @param {Object} obj - The object to be checked.
 * @returns {boolean} - True if the object is empty, false otherwise.
 *
 * @example
 * const emptyObj = {};
 * console.log(objIsEmpty(emptyObj)); // Output: true
 *
 * const nonEmptyObj = { key: 'value' };
 * console.log(objIsEmpty(nonEmptyObj)); // Output: false
 */
function objIsEmpty(obj){
  if(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if a given value is an object.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} - True if the value is an object, false otherwise.
 *
 * @example
 * const obj = { key: 'value' };
 * console.log(isObject(obj)); // Output: true
 *
 * const str = 'Hello world';
 * console.log(isObject(str)); // Output: false
 */
function isObject(value){
  if (typeof value === 'object' &&
     !Array.isArray(value) &&
     value !== null) {
     return true;
  }else{
    return false;
  }
}


const regexValidation = (e, regex) => {
  if (!regex.test(e.key)) {
     e.preventDefault();
     e.stopPropagation();
  }
};

/**
 * Returns an accurate greeting based on the current time.
 *
 * @returns {string} - The greeting message.
 *
 * The function determines the current hour and returns the appropriate greeting:
 * - 'Good Morning' for hours before 12.
 * - 'Good Afternoon' for hours between 12 and 17.
 * - 'Good Evening' for hours after 17.
 */
function getAccurateGreeting(){
  const time = new Date();
  if (time.getHours() < 12) {
     return 'Good Morning';
  } else if (time.getHours() > 12 && time.getHours() < 17) {
     return 'Good Afternoon';
  } else {
     return 'Good Evening';
  }
};

/**
 * @param email string value
 * 
 *  useCase - validate email
 */ 
 const isValidEmail =(email)=>{
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}


/**
 * Formats a string of characters by inserting a specified separator after every group of characters.
 *
 * @param {string} char - The string of characters to be formatted.
 * @param {number} [groupBy=4] - The number of characters after which a separator should be inserted.
 * @param {string} [separator=""] - The separator to be inserted between groups of characters.
 * @returns {string} - The formatted string of characters.
 *
 * @example
 * const formattedString = charFormatter('Hello World', 5, '-');
 * console.log(formattedString); // Outputs: 'Hello-World'
 */
function charFormatter(char, groupBy = 4, separator = "") {
  let arr = [...char];
  let i = 0, newChar = '';
  while (i < arr.length) {
    if (i !== 0) {
      if (i % groupBy === 0) {
        newChar += separator;
      }
    }
    newChar += arr[i];
    i++;
  }
  
  return newChar;
}


/**
 * 
 * @param {string | inputEvent} char characters to formate of an inputEvent
 * @param {{}} options separator | inPosition
 * @returns string
 */
/**
 * Inserts a specified separator character after every group of characters in a given string.
 *
 * @param {string | InputEvent} char - The string of characters to be formatted or the event object containing the input field.
 * @param {Object} options - An object containing the options for formatting the string.
 * @param {string} [options.separator=' '] - The separator character to be inserted. Default is a space.
 * @param {number} [options.inPosition=4] - The number of characters after which a separator should be inserted. Default is 4.
 * @param {boolean} [options.onEvent=false] - A flag indicating whether the input is an event object. Default is false.
 * @returns {string} - The formatted string of characters.
 *
 * @example
 * const formattedString = insertTextSeperator('Hello World', { separator: '-', inPosition: 5 });
 * console.log(formattedString); // Outputs: 'Hello-World'
 */
function insertTextSeperator(char,options){
  const {separator=' ',inPosition=4, onEvent=typeof char === 'object'&& char.target !==undefined?true:false} = options;
  
  let input = char;
  if(onEvent){
       if((char.inputType&&char.inputType==="deleteContentBackward") || (char.nativeEvent.inputType&&char.nativeEvent.inputType === "deleteContentBackward")) return char.target.value;
       input = char.target.value;
     }
         let charArray = [...input.replaceAll(new RegExp('[^a-zA-Z0-9 ]|'+separator,'g'),'')];
       let i =0, newchar= '';
       while(i<charArray.length){
         if(i%inPosition===0&&i!==0){ //every 4th position;
           newchar +=separator;
         }
         newchar += charArray[i];
         i++;
       }
       
       return newchar;

 }

 var ssp = {
  handleInputs:(ev)=>{
     let field = ev.target;
 
   if(!/^[0-9]*$/.test(field.value))return field.value = '';
         if (field.value.length === 1) {
           if(field.nextElementSibling){
           console.log(field.value.length);
             field.nextElementSibling.focus();
         }else{
             return; 
         }
     }
     },


 handlePaste:(e)=>{
     e.stopPropagation();
     e.preventDefault();
     
    let clipboardData = e.clipboardData || window.clipboardData;
     let pastedData = clipboardData.getData('Text');
 
     if(Number.isInteger(+pastedData)){
             let str = pastedData.toString();
         if(str.length > 0){
           let nums = str.split('');
         let fields = e.target.parentElement.children;
         
         for(let i = 0; i<nums.length; i++){
           fields[i].value=nums[i]; fields[i].focus();
           if(i===fields.length-1)break;
         }
         
       }
     }
     
 },
 handleArrowMovement:(e)=>{
     let box = e.target;
   if(e.keyCode === 37){
       if(!box.previousElementSibling)return; 
         box.previousElementSibling.focus();
       box.selectionStart = box.selectionEnd = box.value.length;
   } else if(e.keyCode === 39){
       if(!box.nextElementSibling)return; 
         box.nextElementSibling.focus();
   }
   
   if(e.keyCode === 8){
     e.preventDefault();
     if(!box.previousElementSibling) return box.value = '';
     box.value = '';
     box.previousElementSibling.focus();
     
      
   }else if(e.keyCode === 46){
     e.preventDefault();
     if(!box.nextElementSibling) return box.value = '';
     box.value = '';
     box.nextElementSibling.focus();   
 }
 }

}

const ssp_inputs = document.querySelectorAll('[sniper-secure-pin] input');
if(ssp_inputs){
  Array.from(ssp_inputs).forEach((input)=>{
    input.setAttribute('maxlength',1);
    input.oninput = (e)=>ssp.handleInputs(e);
    input.onpaste = (e)=>ssp.handlePaste(e);
    input.onkeydown = (e)=>ssp.handleArrowMovement(e);
  })
}



/**
 * Formats a date object into a string with the month name.
 *
 * @returns {string} - The formatted date string in the format 'DD MonthName, YYYY'.
 *
 * @example
 * const date = new Date('2022-05-15');
 * const formattedDate = formatDateWithMonthName(date);
 * console.log(formattedDate); // Outputs: '15 May, 2022'
 */
function formatDateWithMonthName(){
  if (!date) return '';

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;

  const formattedDate = `${newDate.getDate().toString().padStart(2, '0')} ${getMonths()[month-1]}, ${year}`;
  return formattedDate;
};


/**
 * A utility function to select elements from the DOM.
 *
 * @param {string} selector - The CSS selector to match. Optionally, you can add an asterisk to the selector to return all matching elements. e.g 'selector*' matches all while 'selector' matches just one element
 * @param {boolean} [all=false] - A flag indicating whether to return all matching elements or just the first one. 
 * @returns {HTMLElement|NodeList} - The matching DOM element(s).
 *
 * @example
 * $('.container'); // Returns the first element with the class 'container'
 * $('.container', true); // Returns all elements with the class 'container'
 * $('[data-role="header"]'); // Returns the first element with the attribute 'data-role' set to 'header'
 * $('[data-role="header"]', true); // Returns all elements with the attribute 'data-role' set to 'header'
 * $('#wrapper'); // Returns the element with the id 'wrapper'
 * $('.wrapper*'); // Returns all the matched elements with the class 'wrapper'
 */
function $(selector='',all=false){
  if(selector.at(-1)==='*'){
    all = true;
    selector = selector.substring(0,selector.length-1);
  }

  return all ? document.querySelectorAll(selector): document.querySelector(selector);
}

/**
 * Truncates a string to a specified maximum length and appends an ellipsis if the string is longer than the maximum length.
 *
 * @param {number} [maxLength=200] - The maximum length of the truncated string. Default is 200.
 * @returns {string} - The truncated string with an ellipsis if the original string was longer than the maximum length.
 *
 * @example
 * const originalString = 'This is a very long string that needs to be truncated.';
 * const truncatedString = originalString.truncate(50);
 * console.log(truncatedString); // Outputs: 'This is a very long string that needs...'
 */
String.prototype.truncate = function(maxLength = 200) {
  if (this.length > maxLength) {
      return this.substring(0, maxLength) + '...';
  }
  return this.toString();
};

/**
 * Adds a specified class to the element.
 *
 * @param {string} token - The class name to be added.
 * @returns {HTMLElement} - The element with the added class.
 */
HTMLElement.prototype.addClass=function(token){
  this.classList.add(token);
  return this;
}

/**
 * Adds a specified class to each node in the NodeList.
 *
 * @param {string} token - The class name to be added.
 * @returns {NodeList} - The NodeList with the added class.
 */
NodeList.prototype.addClass = function(token) {
  Array.from(this).forEach((node) => node.classList.add(token));
  return this;
};
/**
 * Replaces a specified class with a new class in each node in the NodeList.
 *
 * @param {string} token - The class name to be replaced.
 * @param {string} newToken - The new class name to be added.
 * @returns {NodeList} - The NodeList with the replaced class.
 */
NodeList.prototype.replaceClass = function(token, newToken) {
  Array.from(this).forEach((node) => node.classList.replace(token, newToken));
  return this;
};
/**
 * Replaces a specified class with a new class in the HTML element.
 *
 * @param {string} token - The class name to be replaced.
 * @param {string} newToken - The new class name to be added.
 * @returns {HTMLElement} - The HTML element with the replaced class.
 */
HTMLElement.prototype.replaceClass=function(token,newToken){
  this.classList.replace(token,newToken);
  return this;
}

/**
 * Removes a specified class from each node in the NodeList.
 *
 * @param {string} token - The class name to be removed.
 * @returns {NodeList} - The NodeList with the removed class.
 */
NodeList.prototype.removeClass = function(token) {
  Array.from(this).forEach((node) => node.classList.remove(token));
  return this;
}

/**
 * Removes a specified class from the HTML element.
 *
 * @param {string} token - The class name to be removed.
 * @returns {HTMLElement} - The HTML element with the removed class.
 */
HTMLElement.prototype.removeClass=function(token){
  this.classList.remove(token);
  return this;
}

/**
 * Sets the HTML content of the HTML element.
 *
 * @param {string} HTMLString - The HTML content to be set.
 * @returns {HTMLElement} - The HTML element with the updated content.
 */
HTMLElement.prototype.html=function(HTMLString){
  this.innerHTML = HTMLString;
  return this;
}
/**
 * Sets the HTML content of the HTML element.
 *
 * @param {string} HTMLString - The HTML content to be set.
 * @returns {NodeList} - The NodeList with the updated content.
 */
NodeList.prototype.html=function(HTMLString){
  Array.from(this).forEach((node)=>node.innerHTML = HTMLString);
  return this;
}

/**
 * Sets the text content of the HTML element.
 *
 * @param {string} value - The text content to be set.
 * @returns {HTMLElement} - The HTML element with the updated content.
 */
HTMLElement.prototype.text=function(value){
  this.textContent = value;
  return this;
}

/**
 * Sets the text content of each node in the NodeList.
 *
 * @param {string} value - The text content to be set.
 * @returns {NodeList} - The NodeList with the updated content.
 */
NodeList.prototype.text=function(value){
  Array.from(this).forEach((node)=>node.textContent = value);
  return this;
}

/**
 * Checks if the HTML element has a specified class.
 *
 * @param {string} token - The class name to check.
 * @returns {boolean} - True if the element has the specified class, false otherwise.
 */
HTMLElement.prototype.hasClass=function(token){
  return this.classList.contains(token);
}

/**
 * Checks if each node in the NodeList has a specified class.
 *
 * @param {string} token - The class name to check.
 * @returns {boolean} - True if all elements have the specified class, false otherwise.
 */
NodeList.prototype.hasClass=function(token){
  return Array.from(this).every(element => element.classList.contains(token));
}

/**
 * Adds an event listener to each node in the NodeList.
 *
 * @param {string} type - The event type to listen for.
 * @param {function} callback - The function to be called when the event occurs.
 * @param {object} options - The options for the event listener.
 * @returns {NodeList} - The NodeList with the added event listener.
 */
NodeList.prototype.addEventListener=function(type,callback,options){
  return Array.from(this).forEach((element)=>element.addEventListener(type,callback,options));
}

/**
 * Checks if an object is iterable.
 *
 * @param {object} obj - The object to check.
 * @returns {boolean} - True if the object is iterable, false otherwise.
 */
function isIterable(obj) {
    return obj && typeof obj[Symbol.iterator] === 'function';
}

/**
 * Generates a random integer between a specified minimum and maximum value.
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Trims leading whitespace from the start of a string.
 *
 * @param {string} junk - The characters to trim. Default is a single space.
 * @returns {string} - The trimmed string.
*/
String.prototype.trimStart = function(junk=' ') {
  const str = this.toString();
  return str.startsWith(junk) ? str.slice(junk.length,str.length): str;
}

//--- old version
// String.prototype.trimStart = function(junk=' ') {
//   const string = [...this]; 
//   let i = 0,char = [];
//   while (junk[i]){
//     if(junk[i]===string[i]){
//      char +=junk[i];
//     }

//     i++;
//   }

//  return (char!=junk)?this.toString(): this.substring(this.indexOf(char.at(-1))+1);
// }

/**
 * Trims trailing whitespace from the end of a string.
 *
 * @param {string} junk - The characters to trim. Default is a single space.
 * @returns {string} - The trimmed string.
 */
String.prototype.trimEnd = function(junk=' ') {
  const str = this.toString();
  return str.endsWith(junk) ? str.slice(0,`-${junk.length}`): str;
}
//--- old version
// String.prototype.trimEnd= function(junk=' ') {
//   let i = 0,char = '';
//   while (junk.at(i)){
//   i--;
//   if(this.at(i)===junk.at(i)){
//       char =  junk.at(i)+char;
//   }
// }

//  return (char!=junk)?this.toString(): this.substring(0,(this.length - char.length));
// }

/**
 * Parses the query string of the current URL and returns an object containing the key-value pairs.
 *
 * @returns {object} - An object containing the key-value pairs from the query string.
 */
Location.prototype.queryObject = function(){
  const query = this.search.trimStart('?');
  return query.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
  }, {});
}

/**
 * Removes each node in the NodeList from the DOM.
 *
 * @returns {NodeList} The NodeList from which the nodes were removed.
 */
NodeList.prototype.remove = function() {
  Array.from(this).forEach((node) => node.remove());
  return this;
}
