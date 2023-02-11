import Person from "./Person"

const Persons = ({ persons, handlePersonDeleteOf }) =>
    <ul>
        {persons.map(person => <Person key={person.id} person={person} handlePersonDelete={handlePersonDeleteOf(person)} />)}
    </ul>

export default Persons
