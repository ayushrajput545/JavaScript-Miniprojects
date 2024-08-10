//  Fetching all the tabs

const userTab = document.querySelector("[data-userWeather]");
const searchTab= document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
 
//Fetching all Screens
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially variable needed ??

let currentTab = userTab;  //by default our app open with user weather interface
const API_KEY = "639b73508cfdae944c642ded49707874";
currentTab.classList.add("current-tab");  //adding css properties in this
getfromSessionStorage(); // Cordinate session storage me present hain ya nahi


 
 userTab.addEventListener("click",() => {
    switchTab(userTab); //pass clicked tab as input
 });

 searchTab.addEventListener("click" , ()=>{
    switchTab(searchTab);
 });


 //switching tabs on clicking  userTab to SearchTab or vice verse

 function switchTab(clickedTab){
     
   //TAB SWITCH 
    if(clickedTab!=currentTab){ //both tab diffrent hain
         currentTab.classList.toggle("current-tab"); //removing current class css properties
         currentTab = clickedTab; // switch Tab
         currentTab.classList.toggle("current-tab");

   //CONTENT SWITCH
         if(!searchForm.classList.contains("active")){ //if searchform is not active then make it active and remains become inactive
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
         }
         //Your weather wale tab par click hua hai
         else{                                
            searchForm.classList.remove("active"); // if it is active 
            userInfoContainer.classList.remove("active");// searched city ka interface bhi invisible karna hoga
            //Ab mai you weather me agya hu
            //lets check local storage for cordinates , if we have saved them.
            getfromSessionStorage();     //get cordinates of your weather ; user ki current location ka weather visible karana hai
              
         }
    }
 }

 ///check if coordinate are already present in session storage
 function getfromSessionStorage(){

   const localCoordinate = sessionStorage.getItem("user-coordinates"); //user phli baar weather app par aaya usne location allow kardi now wo data session stoage me save hogya
   if(!localCoordinate){
      //agar local coordinate nahi mile toh grant access visible karwana hai
      grantAccessContainer.classList.add("active");
   }
   else{
      //agar local cordinate present hain then unko json me convert kardo
      const coordinates = JSON.parse(localCoordinate);
      fetchUserWeatherInfo(coordinates); //we need to fetc cordinate(lat , long) of current user location
   }
 }

 async function fetchUserWeatherInfo(coordinates){

   const{lat, lon} = coordinates; // coordinates(334.4,333) ko long and lat me daal die

   //make grant location invisible

   grantAccessContainer.classList.remove("active");

   //make loader visible
   loadingScreen.classList.add("active");

   //API CALL
   try{
      const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data); // YE funstion dynamically value(city name, temp, country code) dale ga unserinfo container me data se
   }
   catch(err){
      loadingScreen.classList.remove("active");
      
      //HW
       
      
   }
   
 }

 function renderWeatherInfo(weatherInfo){
   
   //Firstly we fetch the elements from HTML
   
   const cityName = document.querySelector("[data-cityName]");
   const countryIcon =document.querySelector("[ data-countryIcon]");
   const desc = document.querySelector("[data-weatherDesc]");
   const weatherIcon = document.querySelector("[data-weatherIcon]");
   const temp =  document.querySelector("[data-temp]");
   const windspeed = document.querySelector("[data-windspeed]");
   const humidity = document.querySelector("[data-humidity]");
   const cloudiness =document.querySelector("[data-cloudiness]");


    //fetch values from weatherInfo object using optional chaining opeator ?.
     cityName.innerText = weatherInfo?.name; // set text dynimacally
     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`; //add image link flagcdn link
     desc.innerText = weatherInfo?.weather?.[0]?.description;
     weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}.png`;//check this link by opening it on broweser put icon value from json
     temp.innerText = `${weatherInfo?.main?.temp} °C`;   // Backtik and ${} are used bcz to write degree celcius after custom attributes
     windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
     humidity.innerText = `${weatherInfo?.main?.humidity}%`;
     cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


 }

 //if coordinates nahi pade hain then grant access wala show hoga 
 //grant access button pe click karne se kya hoga ??
 //then uspe click karne se curentposition call hogi then usko UI pe show karwaayge 
 //agar coordinate already mil jate hain storage me then direct weather UI pe show karwa dege

 const grantAccessButton = document.querySelector("[data-grantAccess]");
 grantAccessButton.addEventListener("click",getLocation);


 function getLocation(){
   if(navigator.geolocation) {//Agar geolocation API supported hai toh
      navigator.geolocation.getCurrentPosition(showPosition); // pass call back function showposition

   }
   else{
      //HW .....show and alert for no geolocation support available 

   }
 }

 function showPosition(position){

 //craeting object and finding the coordinate using geolocaion API
 const userCoordinates = {
   lat:position.coords.latitude,
   lon: position.coords.longitude,
 };

 //Now store these coordinate is session storage 
 sessionStorage.setItem("user-coordinates" , JSON.stringify(userCoordinates));//userCoordinate ko string me change karke user-coordinate me store kardiya
 //Show weather on clicking
 fetchUserWeatherInfo(userCoordinates);

 }

 const searchInput = document.querySelector("[data-searchInput]");
 searchForm.addEventListener("submit" , (e) => {
   e.preventDefault();  //prevent default action
    let cityName = searchInput.value;
    if(cityName === "")
       return;
    else
       fetchSearchWeatherInfo(cityName);
 })

 let cityNotFound = document.querySelector(".cityNotFound");
 async function fetchSearchWeatherInfo(city) //make it async bcz we call API in it
 {
   loadingScreen.classList.add("active");
   cityNotFound.classList.remove("active");
   userInfoContainer.classList.remove("active");
   grantAccessContainer.classList.remove("active");
   try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
       const data = await response.json();
       
       loadingScreen.classList.remove("active");
        
        if(!response.ok){     //API SUCCESSFULLY CHALI YA NAHI
         throw new Error();   //NOW CATCH WALA CHALEGA
       }else{
         renderWeatherInfo(data);
       userInfoContainer.classList.add("active");
       }
       
   }
   catch(err){
     cityNotFound.classList.add("active"); 
   }
 }









 


 
  