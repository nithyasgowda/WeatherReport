console.log("hi javascript")
document.addEventListener("DOMContentLoaded", ()=>{
    let city_info = document.getElementById("city-info")
    let search_btn = document.getElementById("search_btn")
    let cityName = document.getElementById("cityName")
    let Temperature = document.getElementById("Temperature")
    let weather_Description = document.getElementById("weather-description");
    console.log(city_info, search_btn, Temperature, weather_Description);

    let placeholder = "Enter your city name";
    let i = 0;
    
    setInterval(() => {
        if (i <= placeholder.length) {
            city_info.placeholder = placeholder.slice(0, i++);
        } else {
            city_info.placeholder = placeholder + '.'.repeat((i++ - placeholder.length) % 4);
        }
    }, 200);

    search_btn.addEventListener("click", ()=>{
        let city = city_info.value;
        if(city){
            getWeatherData(city);
        }else{
            alert("Please enter your city name");
        }
    });

    async function getWeatherData(city){
        const apiKey = "0135c0a7a5199009d87f7fcf4cd208b9"; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        try {
            let response = await fetch(apiUrl)
            console.log(response);
            let data = await response.json()
            console.log(data);
            if(data.cod === 200){
                cityName.innerHTML = `Weather in ${data.name}, ${data.sys.country}`
                Temperature.innerHTML = `Temperature in ${data.name} is ${data.main.temp}`
                weather_Description.innerHTML = `Weather report of ${data.name} is ${data.weather[0].description}`
            }else{
                alert("error occured");
            }
            
        } 
        catch (error) {
            console.log("error is occured", error);
        }
    }
})

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric