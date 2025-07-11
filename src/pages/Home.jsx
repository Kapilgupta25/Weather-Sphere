import { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudyHigh,
  WiNightClear,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiBarometer
} from "react-icons/wi";
import { FiSearch } from "react-icons/fi";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (condition, isDay = true) => {
    const conditionText = condition.toLowerCase();
    
    if (conditionText.includes('sunny') || conditionText.includes('clear')) {
      return isDay ? <WiDaySunny className="text-yellow-400" size={60} /> : <WiNightClear className="text-indigo-300" size={60} />;
    } else if (conditionText.includes('cloudy')) {
      return <WiCloudy className="text-gray-400" size={60} />;
    } else if (conditionText.includes('partly cloudy')) {
      return isDay ? <WiDayCloudyHigh className="text-gray-300" size={60} /> : <WiCloudy className="text-gray-400" size={60} />;
    } else if (conditionText.includes('rain') || conditionText.includes('drizzle')) {
      return <WiRain className="text-blue-400" size={60} />;
    } else if (conditionText.includes('snow')) {
      return <WiSnow className="text-blue-200" size={60} />;
    } else if (conditionText.includes('thunder') || conditionText.includes('storm')) {
      return <WiThunderstorm className="text-purple-500" size={60} />;
    } else if (conditionText.includes('fog') || conditionText.includes('mist')) {
      return <WiFog className="text-gray-300" size={60} />;
    } else {
      return isDay ? <WiDaySunny className="text-yellow-400" size={60} /> : <WiNightClear className="text-indigo-300" size={60} />;
    }
  };

  const getWeather = async () => {
    if (!city){
      setError("Please Enter City Name..");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try another location.", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 flex flex-col items-center justify-center px-4 py-10 text-white font-sans transition-all duration-700">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl px-2 py-2 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          🌦️ Weather Sphere
        </h1>
        <p className="text-center text-blue-100 mb-6 text-lg max-w-md">
          Discover real-time weather conditions anywhere in the world
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md mb-8 transition-transform hover:scale-[1.02] duration-300">
        <input
          type="text"
          placeholder="Enter city name..."
          className="bg-white/90 w-full px-4 py-3 rounded-lg shadow-lg text-gray-900 outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && getWeather()}
        />
        <button
          onClick={getWeather}
          className={`bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 active:scale-95 ${
            loading ? "opacity-75" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <FiSearch size={18} />
              Search
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/90 text-white px-4 py-3 rounded-lg shadow mb-4 flex items-center gap-2 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {weather && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 w-full max-w-sm animate-fade-in-up">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="text-blue-100">
                {new Date(weather.location.localtime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">
                {new Date(weather.location.localtime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between my-6">
            <div className="flex items-center">
              <div className="mr-4">
                {getWeatherIcon(weather.current.condition.text, weather.current.is_day === 1)}
              </div>
              <div>
                <p className="text-5xl font-bold">
                  {weather.current.temp_c}°C
                </p>
                <p className="text-lg capitalize text-blue-100">
                  {weather.current.condition.text}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <WiHumidity className="text-3xl text-cyan-300 mx-auto mb-1" />
              <p className="text-xs text-blue-100">Humidity</p>
              <p className="font-semibold">{weather.current.humidity}%</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <WiStrongWind className="text-3xl text-cyan-300 mx-auto mb-1" />
              <p className="text-xs text-blue-100">Wind</p>
              <p className="font-semibold">{weather.current.wind_kph} kph</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <WiThermometer className="text-3xl text-cyan-300 mx-auto mb-1" />
              <p className="text-xs text-blue-100">Feels like</p>
              <p className="font-semibold">{weather.current.feelslike_c}°C</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/10 p-3 rounded-lg">
              <WiBarometer className="text-3xl text-cyan-300 mx-auto mb-1" />
              <p className="text-xs text-blue-100">Pressure</p>
              <p className="font-semibold">{weather.current.pressure_mb} mb</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <div className="text-3xl text-cyan-300 mx-auto mb-1">UV</div>
              <p className="text-xs text-blue-100">Index</p>
              <p className="font-semibold">{weather.current.uv}</p>
            </div>
          </div>
        </div>
      )}

      {!weather && !error && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center shadow-lg border border-white/20 w-full max-w-sm animate-fade-in">
          <div className="text-cyan-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Explore Weather</h3>
          <p className="text-blue-100">Enter a city name to get current weather information</p>
        </div>
      )}
    </div>
  );
};

export default Home;