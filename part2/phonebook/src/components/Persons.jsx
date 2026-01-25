const Person = (props) => {
  return (
    <>
      {props.name}: {props.number}
      <button onClick={props.onDelete}>delete</button>
      <br />
    </>
  );
};

const Persons = ({ persons, filterValue, onDelete }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().startsWith(filterValue.toLowerCase()),
        )
        .map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onDelete={(event) => onDelete(event, person)}
          />
        ))}
    </>
  );
};

export default Persons;
