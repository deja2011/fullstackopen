import { useEffect, useState } from 'react'

import countryServices from './services/countries'
import weatherServices from './services/weather'

import './index.css'

const Filter = ({ pattern, handlePatternChange }) => {
  return <form>
    <div>
      <span>find countries</span><input value={pattern} onChange={handlePatternChange} />
    </div>
  </form>
}

const CountryList = ({ pattern, countries, handleShowCountryOf }) => {
  let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))
  if (filteredCountries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(c => <CountrySelector key={c.name.common} country={c} handleShowCountry={handleShowCountryOf(c)} />)}
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

const CountryDetail = ({ country, weather }) => {
  console.log("Render country detail country:", country, "weather:", weather)
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
        <Weather country={country} weather={weather} />
      </div>
    )
  } else {
    return <div></div>
  }
}

const Weather = ({ country, weather }) => {
  if (country === null || weather === null) {
    return <div></div>
  } else {
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
  // const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [pattern, setPattern] = useState('')
  const [weather, setWeather] = useState(null)

  // let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))

  console.log(
    "rendered app number of countries:", countries.length,
    "country is null:", country === null,
    "weather is null:", weather === null,
    "pattern is:", pattern,
    "numboer of filtered countries:", countries.filter(c => c.name.common.toLowerCase().includes(pattern)).length
  )

  const handlePatternChange = (event) => {
    setPattern(event.target.value.trim().toLowerCase())
    let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))
    // setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(pattern)))
    if (filteredCountries.length === 1) {
      console.log("Render pattern change, pattern:", pattern, "set country to", filteredCountries[0])
      setCountry(filteredCountries[0])
    } else {
      console.log("Render pattern change, pattern:", pattern, "set country to null")
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
      console.log(`Load weather data. Requested weather data of ${country.name.common}`)
      weatherServices.getWeather(country.capitalInfo.latlng).then(data => setWeather(data))
    }
  }, [country])

  const handleShowCountryOf = (country) => {
    return () => {
      setCountry(country)
    }
  }

  let a = (
    <div>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      {country === null ?
        <CountryList pattern={pattern} countries={countries} handleShowCountryOf={handleShowCountryOf} /> :
        <CountryDetail country={country} weather={weather} />
      }
    </div>
  )
  return a
}

export default App;
