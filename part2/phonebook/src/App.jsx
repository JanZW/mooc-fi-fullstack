import { useState } from "react";

const Person = (props) => {
  return (
    <>
      {props.name}: {props.number}
      <br />
    </>
  );
};

const Filter = ({ filterValue, onChange }) => {
  return (
    <div>
      filter shown with <input value={filterValue} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterValue }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().startsWith(filterValue.toLowerCase()),
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
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

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterValue, setFiltervalue] = useState("");

  const handleFilterChange = (event) => {
    setFiltervalue(event.target.value);
  };

  const checkForDuplicate = () => {
    const isIncluded = persons.reduce(
      (isIncludedAcc, currentPerson) =>
        isIncludedAcc || currentPerson.name === newName,
      false,
    );
    return isIncluded;
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    console.log("Number changed to ", event.target.value);
    setNewNumber(event.target.value);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    if (checkForDuplicate()) {
      alert(`${newName} is already in Phonebook!`);
      return;
    }
    const currentIndex = Math.max(...persons.map((person) => person.id)) + 1;
    setPersons(
      persons.concat({ id: currentIndex, name: newName, number: newNumber }),
    );
    setNewName("");
    setNewNumber("");
    console.log("new number restet");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} onChange={handleFilterChange} />

      <h3>New Entry</h3>
      <PersonForm
        newName={newName}
        onNameChange={handleNameInputChange}
        newNumber={newNumber}
        onNumberChange={handleNumberInputChange}
        onSubmit={handleClickSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
