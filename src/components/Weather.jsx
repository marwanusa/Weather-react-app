import React, { useEffect ,useState} from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import himidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"

const Weather = () => {
    const [weatherData,setWeatherData] = useState({})
    const [city,setCity] = useState("Cairo")
    const icons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = icons[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity:data.main.humidity,
        temp:Math.floor(data.main.temp),
        location: data.name,
        wind:data.wind.speed,
        icon:icon,
      })
    } catch (error) {
        alert("Enter A Valid City")
    }
  };
  function serachCity(){
    search(city)
  }
  useEffect(()=>{
    search(city)
  },[])
  return (
    <div className="weather">
      <div className="search_bar">
        <input type="text" value={city} onChange={(e)=>{
            setCity(e.target.value)
        }} placeholder="Search" />
        <img src={search_icon} alt="" onClick={serachCity} />
      </div>
      <div className="weather_info">
        <img src={weatherData.icon} alt="" />
        <h1 className="temp">{weatherData.temp}°C</h1>
        <h3 className="location">{weatherData.location}</h3>
      </div>
      <div className="footer">
        <div className="himidity_info">
          <div className="img">
            <img src={himidity_icon} alt="" />
          </div>
          <div className="info">
            <p className="humidity_percentage">{weatherData.humidity}%</p>
            <p>humidity</p>
          </div>
        </div>
        <div className="wind">
          <div className="img">
            <img src={wind_icon} alt="" />
          </div>
          <div className="wind_info">
            <p className="wind_speed">{weatherData.wind}km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
