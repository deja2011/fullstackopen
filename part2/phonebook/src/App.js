import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setPattern] = useState('')
  const [message, setMessage] = useState(null)

  const getNextId = () => {
    return persons.reduce((a, b) => a > b.id ? a : b.id, 0) + 1
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const existPersons = persons.filter(person => person.name === newName);
    if (existPersons.length) {
      const existPerson = existPersons[0]
      if (window.confirm(`${existPerson} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {...existPerson, number: newNumber};
        services.update(newPerson.id, newPerson).then(data => {
          setPersons(persons.map(p => p.id === newPerson.id ? data : p));
          setMessage({isError: false, text: `Updated person ${newPerson.name} to ${newNumber}`})
          setTimeout(() => setMessage(null), 5000)
        }).catch(error => {
          setMessage({isError: true, text: `Failed to update person ${newPerson.name} to ${newNumber}`})
          setTimeout(() => setMessage(null), 5000)
        })
        setNewName("")
        setNewNumber("")
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: getNextId()
      }
      services.create(newPerson).then(data => {
        setPersons(persons.concat(data));
        setMessage({isError: false, text: `Created new person ${newName}`})
        setTimeout(() => setMessage(null), 5000)
      }).catch(error => {
        setMessage({isError: true, text: `Failed to create new person ${newName}`})
        setTimeout(() => setMessage(null), 5000)
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

  const handlePersonDeleteOf = (person) => {
    return (event) => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        services.remove(person.id).then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage({isError: false, text: `Deleted person ${person.name}`})
          setTimeout(() => setMessage(null), 5000)
        }).catch(error => {
          setMessage({isError: true, text: `Failed to delete person ${person.name}`})
          setTimeout(() => setMessage(null), 5000)
          services.getAll().then(data => setPersons(data))
        })
      }
    }
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
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter pattern={pattern} handlePatternChange={handlePatternChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName} newNumber={newNumber}
        handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handlePersonDeleteOf={handlePersonDeleteOf} />
    </div>
  )
}

export default App
