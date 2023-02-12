import { useEffect, useState } from 'react'

import countryServices from './services/countries'
import weatherServices from './services/weather'

import './index.css'

const Filter = ({ pattern, handlePatternChange }) => {
  console.log("Render filter")
  return  <form>
    <div>
      <span>find countries</span><input value={pattern} onChange={handlePatternChange} />
    </div>
  </form>
}

const CountryList = ({ fCountries, handleShowCountryOf }) => {
  if (fCountries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (fCountries.length > 1) {
    return (
      <div>
        {fCountries.map(c => <CountrySelector key={c.name.common} country={c} handleShowCountry={handleShowCountryOf(c)}/>)}
      </div>
    )
  } else {
    return <div></div>
  }
}

const CountrySelector = ({ country, handleShowCountry }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button onClick={handleShowCountry}>show</button>
    </div>
  )
}

const CountryDetail = ({ country, weatherCache }) => {
  console.log("Render country detail country:", country, "weather cache:", weatherCache)
  if (country !== null) {
    let countryName = country.name.common
    return (
      <div>
        <h1>{countryName}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img className="flag" src={country.flags.png} alt={countryName}></img>
        <Weather country={country} weatherCache={weatherCache}/>
      </div>
    )
  } else {
    return <div></div>
  }
}

const Weather = ({ country, weatherCache }) => {
  if (country === null) {
    console.log("Skip render weather, country is null")
    return <div></div>
  } else if (!(country.name.common in weatherCache)) {
    console.log("Skip render weather, weather cache:", weatherCache)
    return <div></div>
  } else {
    console.log("Render weather, weather cache:", weatherCache)
    let weather = weatherCache[country.name.common]
    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <div>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
        <img src={`${weatherServices.imgUrl}/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [pattern, setPattern] = useState('')
  const [weatherCache, setWeatherCache] = useState({})

  let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))

  console.log(
    "rendered app number of countries:", countries.length,
    "country is null:", country === null,
    "pattern is:", pattern,
    "numboer of filtered countries:", filteredCountries.length,
    "weather cache length:", Object.keys(weatherCache).length
  )

  const handlePatternChange = (event) => {
    setPattern(event.target.value.trim().toLowerCase())
    filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else {
      setCountry(null)
    }
  }

  useEffect(() => {
    console.log("Load county data")
    countryServices.getAllCountries().then(data => setCountries(data))
  }, [])

  useEffect(() => {
    if (country === null) {
      console.log(`Load weather data. Skip request weather data because country is not set`)
      return
    } else {
      let countryName = country.name.common
      // if ((countryName in weatherCache) && (Date.now() / 1000 - weatherCache[countryName].dt < 3600)) {
      //   console.log(`Load weather data. Skip request weather data because ${countryName} is cached within 1H`)
      //   return
      // }
      // else {
        console.log(`Load weather data. Requested weather data of ${countryName}`)
        weatherServices.getWeather(country.capitalInfo.latlng).then(data => setWeatherCache(w => Object.assign(w, {[countryName]: data})))
      // }
    }
  }, [country])

  const handleShowCountryOf = (country) => {
    return () => {
      setCountry(country)
    }
  }

  console.log("here here")
  let a = (
    <div>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      {country === null ?
        <CountryList fCountries={filteredCountries} handleShowCountryOf={handleShowCountryOf} /> :
        <CountryDetail country={country} weatherCache={weatherCache} />
      }
    </div>
  )
  console.log("there there")
  return a
}

export default App;
