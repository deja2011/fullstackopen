import { useEffect, useState } from 'react'

import services from './services/countries'

import './index.css'

const Filter = ({ pattern, handlePatternChange }) =>
  <form>
    <div>
      <span>find countries</span><input value={pattern} onChange={handlePatternChange} />
    </div>
  </form>

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

const CountryDetail = ({ country }) => {
  if (country !== null) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img className="flag" src={country.flags.png} alt={country.name.common}></img>
      </div>
    )
  } else {
    return <div></div>
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [pattern, setPattern] = useState('')

  let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))

  console.log(
    "rendered app number of countries:", countries.length,
    "country is null:", country === null,
    "pattern is:", pattern,
    "numboer of filtered countries:", filteredCountries.length
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
    services.getAll().then(data => setCountries(data))
  }, [])

  const handleShowCountryOf = (country) => {
    return () => {
      setCountry(country)
    }
  }

  return (
    <div>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      {country === null ?
        <CountryList fCountries={filteredCountries} handleShowCountryOf={handleShowCountryOf} /> :
        <CountryDetail country={country} />
      }
    </div>
  )
}

export default App;
