import {BrowserRouter as Router} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from './actions/users';
import {fetchHistory} from './actions/loginHistory'
import { updateTheme } from './utils/themeUtils';

function App() {

  const dispatch = useDispatch();

  // const updateTheme = async() => {
  //     try {
  //       const response = await fetch('https://ipapi.co/json/');
  //       const locationData = await response.json();
  //       // console.log(locationData)

  //       const lat = locationData.latitude;
  //       const lon = locationData.longitude;
  //       // console.log(lat)
  //       const apiKey = 'e507fddb02f6c5b9d28471c709a9a75f'; 
  //       const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  //       const weatherResponse = await fetch(weatherApiUrl);
  //       const weatherData = await weatherResponse.json();
  //       // console.log(weatherData)

  //       const isDay = weatherData.weather[0].icon.includes('d');
  //       console.log(isDay)

  //       const body = document.body;
  //       console.log(body)
  //       if (isDay) {
  //         body.classList.remove('dark-theme');
  //         body.classList.add('light-theme');
  //         body.style.setProperty('--primary-bg', '#ffffff');
  //         body.style.setProperty('--text-color', '#000000');
  //       } else {
  //         body.classList.remove('light-theme');
  //         body.classList.add('dark-theme');
  //         body.style.setProperty('--primary-bg', '#333333');
  //         body.style.setProperty('--text-color', '#ffffff');
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  // }

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(fetchHistory());
    updateTheme();
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn}/>
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      </Router>
    </div>
  );
}

export default App;
