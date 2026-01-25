import { useState } from "react";

const Person = (props) => {
  return (
    <>
      {props.name}: {props.number}
      <br />
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  let currentIndex = 4;

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterValue, setFiltervalue] = useState("");

  const checkForDuplicate = () => {
    const isIncluded = persons.reduce(
      (isIncludedAcc, currentPerson) =>
        isIncludedAcc || currentPerson.name === newName,
      false,
    );
    return isIncluded;
  };

  const handleFilterChange = (event) => {
    setFiltervalue(event.target.value);
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    if (checkForDuplicate()) {
      alert(`${newName} is already in Phonebook!`);
      return;
    }
    currentIndex++;
    setPersons(
      persons.concat({ id: currentIndex, name: newName, number: newNumber }),
    );
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with{" "}
        <input value={filterValue} onChange={handleFilterChange} />
      </div>
      <h2>New Entry</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClickSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().startsWith(filterValue.toLowerCase()),
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </div>
  );
};

export default App;
