async function fetchWeather(city) {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';//rapid api-> weather api.com
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '06bf238e05msh64bf9606e87052ep159f96jsn34f0668cd0cc',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url+city, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        document.querySelector('.temp').innerHTML=Math.round(result.current.temp_c)+'&degC';
        document.querySelector('.cname').innerHTML=result.location.name;
        document.querySelector('.humidity').innerHTML=result.current.humidity+'%';
        document.querySelector('.wind').innerHTML=result.current.wind_kph+'km/h';

        let wicon=document.getElementById("weathericon");
        if(result.current.condition.text=='Light rain shower'){
            wicon.src='images/light_rain.png';
            document.getElementById("body").style.backgroundColor='rgb(89, 157, 169)';
        }
        if(result.current.condition.text=='Light rain'){//modified
            wicon.src='images/light_rain.png';
            document.getElementById("body").style.backgroundColor='rgb(89, 157, 169)';
        }
        if(result.current.condition.text=='Light drizzle'){
            wicon.src='images/light_rain.png';
            document.getElementById("body").style.backgroundColor='rgb(89, 157, 169)';
        }
        else if(result.current.condition.text=='Moderate or heavy raining'){
            wicon.src='images/heavy_rain.png';
            document.getElementById("body").style.backgroundColor='rgb(61, 82, 105)';
        }
        else if(result.current.condition.text=='Overcast'){
            wicon.src='images/more_cloudy.png';
            document.getElementById("body").style.backgroundColor='darkgrey';
        }
        else if(result.current.condition.text=='Partly Cloudy'){
            wicon.src='images/more_cloudy.png';
            document.getElementById("body").style.backgroundColor='rgb(86, 85, 85)';
        }
        else if(result.current.condition.text=='Cloudy'){
            wicon.src='images/more_cloudy.png';
            document.getElementById("body").style.backgroundColor='rgb(121, 121, 119)';
        }
        else if(result.current.condition.text=='Sunny'){
            wicon.src='images/sunny.png';
            document.getElementById("body").style.backgroundColor='rgb(205, 205, 103)';
        }
        else if(result.current.condition.text=='Patchy rain nearby'){
            wicon.src='images/more_cloudy.png';
            document.getElementById("body").style.backgroundColor='rgb(86, 85, 85)';
        }
        else if(result.current.condition.text=='Light freezing rain'){
            wicon.src='images/snowy.png';
            document.getElementById("body").style.backgroundColor='rgb(179, 179, 176)';
        }
        else if(result.current.condition.text=='Clear'){
            wicon.src='images/sunny.png';
            document.getElementById("body").style.backgroundColor='rgb(205, 205, 103)';
        }

        console.log(result.location.localtime);
        console.log(result.location.localtime.length);
        let timeop=''
        for (let i=11; i<16; i++) {
            timeop+=result.location.localtime[i];
        }
        console.log(timeop);
        
        document.querySelector('.time').innerHTML=timeop;

        let dateop=''
        for (let i=0; i<10; i++) {
            dateop+=result.location.localtime[i];
        }
        console.log(dateop);
        
        document.querySelector('.date').innerHTML=dateop;

    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack trace:', error.stack);
    }
}

fetchWeather('New Delhi');

const searchbox=document.getElementById("sbox");
const butt=document.getElementById("but");
butt.addEventListener("click",()=>{
    fetchWeather(searchbox.value);
    searchbox.value = '';
})
searchbox.addEventListener("keydown",(event)=>{
    if(event.key=='Enter'){
        fetchWeather(searchbox.value);
        searchbox.value = '';  // Clear the search box
        //searchbox.placeholder = 'enter city name'; //no need for this
    }
})
// Call the async function to fetch weather data
//fetchWeather('Bombay');
