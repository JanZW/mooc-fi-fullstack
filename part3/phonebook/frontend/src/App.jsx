import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filterValue, setFiltervalue] = useState("");

  const [notification, setNotification] = useState({message: null, kind: null});

  useEffect(() => {
    phonebook.getAll().then((data) => setPersons(data));
  }, []);

  const handleFilterChange = (event) => {
    setFiltervalue(event.target.value);
  };

  const findDuplicate = () => {
    return persons.find((currentPerson) => currentPerson.name === newName);
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    const existingEntry = findDuplicate();
    const newEntry = {
      name: newName,
      number: newNumber,
    };
    if (existingEntry == null) {
      phonebook
        .create(newEntry)
        .then((data) => {
          setPersons(persons.concat(data));
        })
        .then(() => {
          setNotification({message: "Added User to DB", kind: "success"});
          setTimeout(() => {
            setNotification({message: null, kind: null});
          }, 5000);
        })
        .catch((error) => {
          setNotification({message: "could not add user", kind: 'error'});
          setTimeout(() => {
            setNotification({message: null, kind: null});
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already in phonebook, replace the old number with a new one?`,
        )
      ) {
        console.log("update old entry");
        phonebook
          .update(existingEntry.id, newEntry)
          .then(() => {
            setNotification({message: `Updated phone number for ${newEntry.name}`, kind: 'success'});
            setTimeout(() => {
              setNotification({message: null, kind: null});
            }, 5000);
            setPersons([
              ...persons.filter((p) => p.id !== existingEntry.id),
              { id: existingEntry.id, ...newEntry },
            ]);
          })
          .catch(() => {
            setNotification({message: `Entry for ${newName} has already been deleted`, kind: 'error'});
            setTimeout(() => {
              setNotification({message: null, kind: null});
            }, 5000);
            setPersons([...persons.filter((p) => p.id !== existingEntry.id)])
          });
      } else {
        setNotification({message: "Did not store entry in DB", kind: 'error'});
        setTimeout(() => {
          setNotification({message: null, kind: null});
        }, 5000);
        console.log("do not replace old value");
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (event, person) => {
    if (window.confirm(`Do you really want to remove id ${person.name}`)) {
      phonebook
        .remove(person.id)
        .then(() => {
          setNotification({message: `Successfully deleted ${person.name}`, kind: 'success'});
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(() => {
          setNotification({message: "Somthing went wrong while deleting entry", kind: 'error'});
          setTimeout(() => setNotification({message: null, kind: null}), 5000);
        });
      console.log(`removed entry ${person.id}`);
      setPersons(persons.filter((p) => p.id !== person.id));
    } else {
      console.log("abort deletion");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} className={notification.kind} />
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
