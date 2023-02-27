import { useEffect, useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if(!apiData) setError("");
  }, [apiData])
  function handleSearch(){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc69231629b1f34a228a0679fa710396`
      ).then(res => res.json()).then((data) => {
        if(data.cod === 200) {
          setApiData(data);
          setError("");
          setCities([...cities, data.name]);
          console.log(cities);
        }
        else{
          setApiData(null);
          setError("Enter Valid City Name");
        }
      })
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Weather App</h1>
        <input
          type={"search"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search here..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather-data">
        <h2>{error}</h2>
        {
            apiData && 
            <div>
                <p>Weather Details of City: {apiData.name}</p>
                <p>Current Temperature: {apiData.main.temp}</p>
                <p>Temperature Range: {`${apiData.main.temp_min} to ${apiData.main.temp_max}`}</p>
                <p>Humidity: {apiData.main.humidity}</p>
                <p>Latitude: {apiData.coord.lat}</p>
                <p>Longitude: {apiData.coord.lon}</p>
            </div>
        }
      </div>
      <ul>
        {
          cities && !apiData && !error &&
          cities.map((data, index) => {
            return(
              <li key={index}>{data}</li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default WeatherApp;
