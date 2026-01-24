import { useState } from 'react'

const Person = (props) => {
  return (
    <>
      { props.name }
      <br/>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClickSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleClickSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map(person => <Person key={person.name} name={person.name} />) }
    </div>
  )
}

export default App