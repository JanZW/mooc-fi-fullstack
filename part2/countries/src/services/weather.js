import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = ({city}) => {
    console.log('Calling Weather API')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    return axios.get(url)
}

export default { getWeather }