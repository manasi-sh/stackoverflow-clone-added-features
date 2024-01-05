export const updateTheme = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();
        // console.log(locationData)

        const lat = locationData.latitude;
        const lon = locationData.longitude;
        // console.log(lat)
        const apiKey = 'e507fddb02f6c5b9d28471c709a9a75f'; 
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        // console.log(weatherData)

        const isDay = weatherData.weather[0].icon.includes('d');
        // console.log(isDay)
        const isClearSky = weatherData.weather[0].main === 'Clear';
        // console.log(isClearSky)

        const body = document.body;
        // console.log(body)
        if (isDay || isClearSky) {
          body.classList.remove('dark-theme');
          body.classList.add('light-theme');
          body.style.setProperty('--primary-bg', '#ffffff');
          body.style.setProperty('--text-color', '#000000');
        } else {
          body.classList.remove('light-theme');
          body.classList.add('dark-theme');
          body.style.setProperty('--primary-bg', '#333333');
          // body.style.setProperty('--text-color', '#ffffff');
        }
    } catch (error) {
      console.log(error);
    }
  };