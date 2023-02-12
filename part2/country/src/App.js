import { useEffect, useState } from 'react'

import services from './services/countries'

import './index.css'

const Filter = ({pattern, handlePatternChange}) =>
    <form>
        <div>
            <span>find countries</span><input value={pattern} onChange={handlePatternChange} />
        </div>
    </form>

const CountryList = ({fCountries}) => {
  if (fCountries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (fCountries.length > 1) {
    return (
      <div>
          {fCountries.map(c => <div key={c.name.common}>{c.name.common}</div>)}
      </div>
    )
  } else {
    return <div></div>
  }
}

const CountryDetail = ({fCountries}) => {
  if (fCountries.length === 1) {
    let c = fCountries[0]
    return (
      <div>
        <h1>{c.name.common}</h1>
        <div>capital {c.capital[0]}</div>
        <div>area {c.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.values(c.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img class="flag" src={c.flags.png} alt={c.name.common}></img>
      </div>
    )
  }

return (<div></div>)
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [pattern, setPattern] = useState('')

  const handlePatternChange = (event) => {
    setPattern(event.target.value.trim().toLowerCase())
  }

  useEffect(() => {
    console.log("Load county data")
    services.getAll().then(data => setCountries(data))
  }, [])

  let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(pattern))

  return (
  <div>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      <CountryList fCountries={filteredCountries} />
      <CountryDetail fCountries={filteredCountries} />
  </div>
  )
}

export default App;
