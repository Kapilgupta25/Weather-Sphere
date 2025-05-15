import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from "react-icons/wi";

const GettingStarted = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const weatherIcons = [
    <WiDaySunny className="text-yellow-400 text-6xl" />,
    <WiRain className="text-blue-300 text-6xl" />,
    <WiCloudy className="text-gray-300 text-6xl" />,
    <WiSnow className="text-blue-100 text-6xl" />,
    <WiThunderstorm className="text-purple-400 text-6xl" />
  ];

  const handleStart = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/home");
    }, 550);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % weatherIcons.length);
    }, 1500);
    return () => clearInterval(interval);
  });

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen bg-gradient-to-br from-zinc-700 to-zinc-800 text-white transition-transform duration-700 ${
        animate ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-white bg-opacity-10 animate-float"></div>
      <div className="absolute top-1/3 right-24 w-24 h-24 rounded-full bg-white bg-opacity-5 animate-float-delay"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-white bg-opacity-7 animate-float-delay-1"></div>

      <div className="relative bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center max-w-md w-full transform transition-all duration-700 border border-white border-opacity-20">
        {/* Weather icon animation */}
        <div className="mb-6 transition-all duration-1000 transform hover:scale-110">
          {weatherIcons[currentIcon]}
        </div>
        
        <h1 className="text-4xl text-center font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          WeatherSphere
        </h1>
        
        <p className="text-lg mb-8 text-center px-6 max-w-md leading-relaxed">
          Get <span className="font-semibold text-cyan-300">real-time weather updates</span> with accurate forecasts, 
          beautiful visualizations, and personalized alerts for your location.
        </p>
        
        <button
          onClick={handleStart}
          className="relative overflow-hidden text-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 group"
        >
          <span className="relative z-10">Explore Weather</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-2 border-b-2 border-cyan-400 rounded-bl-3xl opacity-60"></div>
        <div className="absolute -top-2 -right-2 w-16 h-16 border-r-2 border-t-2 border-blue-400 rounded-tr-3xl opacity-60"></div>
      </div>
    </div>
  );
};

export default GettingStarted;