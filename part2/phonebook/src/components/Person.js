
const Person = ({person, handlePersonDelete}) => {
    return <li>{person.name} {person.number} <button onClick={handlePersonDelete}>delete</button></li>
}

export default Person