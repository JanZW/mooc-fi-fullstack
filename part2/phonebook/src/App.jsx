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
    { name: "Arto Hellas", number: "123-456-7890" },
  ]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

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
    setNewNumber(event.target.value);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    if (checkForDuplicate()) {
      alert(`${newName} is already in Phonebook!`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
