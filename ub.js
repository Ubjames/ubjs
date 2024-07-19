
function getYears(startDate = 1850,endDate=new Date().getFullYear()){
    if(startDate> endDate) throw new Error("End date cannot be less than start date");
    let years =[];
    while(startDate!=endDate+1){
        years.push(startDate);
        startDate++;
    }
    return years;
}

function getMonths(short=false){ 
    return short?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:["January","February","March","April","May","June","July","August","September","October","November","December"];
}

function getWeekDays(short=false){
    return short?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
}

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
 * String constructor
 * @returns String
 */
 String.prototype.capitalizeFirstLetters = function(){ return this.replace(/\w\S*/g, (s)=> s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())};
 String.prototype.capitalizeFirstLetter  = function(){ return this.charAt(0).toUpperCase() + this.slice(1);}
 
 

function commarize(num){
  let dec='';
  dec = num.toString().search(/\./) > 0? '.'+num.split('.').at(-1):'';
    num = num.toString().search(/\./) < 0? num.toString().split("") :num.toString().split(".")[0];
    let newnum=[], r=1;
    
    for(let i=num.length-1;i>=0;i--){
          newnum.unshift(num[i])
     if(r%3===0 && i!=0)newnum.unshift(",");
      r++;
     
    }

    
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



Array.prototype.shuffle = function(){
  let currentIndex = this.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [this[currentIndex], this[randomIndex]] = [
      this[randomIndex], this[currentIndex]];
  }

  return this;
}


Array.prototype.moveBackward = function(){
  this.push(this.shift());
  return this;

}
Array.prototype.moveForward = function(){
  this.unshift(this.pop());
  return this;

}

const createElement = (el, parent, prepend = false) => {
  const { nodeName = 'div', ...attrs } = el;
  const element = document.createElement(nodeName);
  Object.entries(attrs).forEach(([attr, value]) => {
    element[attr] = value;
  });
 prepend ?parent.prepend(element): parent.append(element);
 
 /* example ->
 createElement(
  {
    nodeName: 'div',
    textContent: 'Hello world',
  },
  root
); */

return element;

};

const IsJsonString = (str) =>{
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function objIsEmpty(obj){
  if(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
    return true;
  } else {
    return false;
  }
}

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

 const getAccurateGreeting = () => {
  const time = new Date();
  if (time.getHours() < 12) {
     return 'Good Morning';
  } else if (time.getHours()
  
  
  > 12 && time.getHours() < 17) {
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
 * @param email string value
 * 
 *  useCase - validate email
 */ 
function charFormatter(char,groupBy=4,seperator=""){
  let arr = [...char];
  let i =0, newChar= '';
  while(i<arr.length){
    if(i!==0)
    if(i%groupBy===0){
      newChar += seperator;
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
const insertTextSeperator  = (char,options)=>{
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

 var pvi = {
  handleInputs:(field)=>{
     e=window.event;
     if(!field) field = e.target;
 
   if(!/^[0-9]*$/.test(field.value))return field.value = '';
         if (field.value.length === 1) {
         if(field.nextElementSibling){
             field.nextElementSibling.focus();
         }else{
             return; 
         }
     }
     },


 handlePaste:(e)=>{
     e = window.event;
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
 handleArrowMovement:(box)=>{
     let e = window.event;
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


const getMonthName = (month) => {
  switch (month) {
     case 1:
        return 'January';
     case 2:
        return 'February';
     case 3:
        return 'March';
     case 4:
        return 'April';
     case 5:
        return 'May';
     case 6:
        return 'June';
     case 7:
        return 'July';
     case 8:
        return 'August';
     case 9:
        return 'September';
     case 10:
        return 'October';
     case 11:
        return 'Novemeber';
     case 12:
        return 'December';
     default:
        break;
  }
};
const formatDateWithMonthName = (date) => {
  if (!date) return '';

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;

  const formattedDate = `${newDate.getDate().toString().padStart(2, '0')} ${getMonthName(month)}, ${year}`;
  return formattedDate;
};

function $(selector='',all=false){
  return all ? document.querySelectorAll(selector): document.querySelector(selector);
 }