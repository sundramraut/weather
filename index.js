

const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="14f743a659717b0d6496dd88dcb33cbe";



  weatherform.addEventListener("submit", async event=>{
    event.preventDefault();
    const city= cityInput.value;
    if(city){
      try{
        showLoading();
        const weatherData= await getweatherData(city);
        hideLoading();
        displayweatherInfo(weatherData);
      }
      catch(error){
        console.error(error);
        displayError("could not fetch data");
      }
    }
      else{
        displayError("please Enter a city name");
      }
  });





async function getweatherData(city){
  const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response=await fetch(apiUrl);

  if(!response.ok){
    throw new Error("cound not fetch weather data");
  }
  return await response.json();
}

function displayweatherInfo(data){

  const {name:city, 
        main:{temp, humidity},
        weather:[{description, id}]}=data;


   card.textContent="";
   card.style.display="flex";


   const cityDisplay=document.createElement("h1");
   const tempDisplay=document.createElement("p");
   const humidityDisplay=document.createElement("p");
   const desDisplay=document.createElement("p");
   const weatherEmoji=document.createElement("p");


   cityDisplay.textContent=city;
   tempDisplay.textContent=`${(temp-273.15).toFixed(1)}C`;
   humidityDisplay.textContent=`Humidity:${humidity}%`;
   desDisplay.textContent=description;
   weatherEmoji.textContent=getweatherEmoji(id);



   cityDisplay.classList.add("cityDisplay");
   tempDisplay.classList.add("tempDisplay");
   humidityDisplay.classList.add("humidityDisplay");
   desDisplay.classList.add("desDisplay");
   weatherEmoji.classList.add("weatherEmoji");
   
    card.appendChild(cityDisplay);
       card.appendChild(tempDisplay);
          card.appendChild(humidityDisplay);
             card.appendChild(desDisplay);
                card.appendChild(weatherEmoji);

   }


   function getweatherEmoji(weatherId){

  if (weatherId >= 200 && weatherId < 300) return "⛈️"; 
  if (weatherId >= 300 && weatherId < 500) return "🌦️"; 
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; 
  if (weatherId >= 600 && weatherId < 700) return "❄️"; 
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; 
  if (weatherId === 800) return "☀️"; 
  if (weatherId > 800) return "☁️"; 
  return "🌈"; 
    
   }
    
  function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
  }

    
  function showLoading(){
    card.textContent="";
    card.style.display="flex";
    const loading=document.createElement("p");
    loading.textContent="Loading...";
    loading.classList.add("LoadingDisplay");
    card.appendChild(loading);
  }

function hideLoading(){
  card.textContent="";
      }
