import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebook from "./services/phonebook";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterValue, setFiltervalue] = useState("");

  useEffect(() => {
    phonebook.getAll().then((data) => setPersons(data));
  }, []);

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

    phonebook
      .create({
        name: newName,
        number: newNumber,
      })
      .then((data) => {
        setPersons(persons.concat(data));
      });

    setNewName("");
    setNewNumber("");
    console.log("new number restet");
  };

  const handleDelete = (event, person) => {
    if (window.confirm(`Do you really want to remove id ${person.name}`)) {
      phonebook.remove(person.id);
      console.log(`removed entry ${person.id}`);
      setPersons(persons.filter((p) => p.id !== person.id));
    } else {
      console.log("abort deletion");
    }
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
      <Persons
        persons={persons}
        filterValue={filterValue}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
