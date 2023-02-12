import axios from 'axios'

const baseUrl = "https://api.openweathermap.org"
const imgUrl = "https://openweathermap.org"
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const getWeather = (latlng) => {
    let params = {
        lat: latlng[0], lon: latlng[1], appid: apiKey
    }
    console.log("request weather with params", params)
    return axios.get(`${baseUrl}/data/2.5/weather`, {'params': params}).then(response => response.data)
}

const services = {
    imgUrl,
    getWeather,
}

export default services

