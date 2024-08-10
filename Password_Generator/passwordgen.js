
  //Showing input slider values.

 let inputSlider = document.getElementById('inputSlider');  //Here we also use by class , queryselector
 let sliderValue= document.getElementById('sliderValue');

 sliderValue.textContent = inputSlider.value; // input slide default value 8 set 


 inputSlider.addEventListener('input' , function(){  //input event used to change the value given in <input> during typing or other

     sliderValue.textContent= inputSlider.value;
 });



 let passBox= document.getElementById('passBox');

 let lowercase= document.getElementById('lowercase');
 let uppercase= document.getElementById('uppercase');
 let numbers= document.getElementById('numbers');
 let symbols= document.getElementById('symbols');

   //ON CLICKING GEN BUTTON
 let getBtn= document.getElementById('genBtn');
   getBtn.addEventListener('click' , function(){
    passBox.value = generatePassword(); //function created Later ; value is attribute of <input> agar koi value doge toh wo direct password box ,ein write ho jaaygi
   });

    
    let lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let allNumbers = '0123456789';
    let allSymbols = '!@#$%&~^';

   function generatePassword(){
      
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : ""; //checked is used to check weather the checkbox is filled or not
    allChars += uppercase.checked ? upperChars:"";
    allChars += numbers.checked ? allNumbers: "";
    allChars += symbols.checked ? allSymbols:"";

     if(allChars=="" || allChars.length ==0){
      return genPassword;
     }

     let i = 1;
     while(i<= inputSlider.value){     // jitni input slider value provide utni he pass genrate

    genPassword += allChars.charAt(Math.floor(Math.random()*allChars.length)); // Math.random It genrate numbers betweem 0 and one;
                                                                                // multiply by 10 yani 10 tak gen. krega ;
                  i++;                                                         // and math.floor convert it into int;
               }                                                               //Now lett gen krega charAt lagane ke badd
         return genPassword;                                       
   }


   //COPY ICON

   let copyIcon = document.getElementById('copyIcon');

   copyIcon.addEventListener('click' , function(){
       
    if(passBox.value != 0){
      navigator.clipboard.writeText(passBox.value); //copy text
      copyIcon.innerText = 'check';                 //change its inner text
      copyIcon.title = 'Password Copied';           //After copiying password thisn popped up
      
      setTimeout(function(){
        copyIcon.innerHTML = 'content_copy';        // innertext 'check' return back its original shape after given set time
       copyIcon.title = "";                         //make it empty
      } , 2000)                                     //in ms 
    }
    
   });











