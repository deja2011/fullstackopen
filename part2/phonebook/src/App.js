import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import services from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setPattern] = useState('')

  let nextId = persons.length
  const getNextId = () => {
    nextId = nextId + 1;
    return nextId
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: getNextId()
      }
      services.create(newPerson).then(data => {
        setPersons(persons.concat(data));
      }).catch(error => {
        alert(`Failed to create new person ${newPerson}: ${error}`)
      })
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePatternChange = (event) => {
    setPattern(event.target.value.trim().toLowerCase())
  }

  useEffect(() => {
    services.getAll().then(data => setPersons(data))
  }, [])

  let filteredPersons = persons
  if (pattern) {
    filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(pattern))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName} newNumber={newNumber}
        handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
