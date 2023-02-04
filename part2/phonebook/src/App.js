import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
      setPersons(persons.concat(newPerson))
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
