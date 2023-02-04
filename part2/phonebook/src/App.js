import { useState } from 'react'

import Person from './components/Person'

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
      <form>
        <div>
          <input value={pattern} onChange={handlePatternChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => <Person key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default App
