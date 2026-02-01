const express = require("express");

const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  console.log("Get all persons");
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;
  console.log("get person with id", personId);

  const person = persons.find((p) => p.id === personId);

  if (!person) {
    response.status(404);
  }

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = request.params.id;

  console.log("deleting person with id", personId);

  persons = persons.filter((p) => p.id !== personId);

  response.status(204);
});

app.post("/api/persons", (request, response) => {
  console.log("adding person");

  const getNewId = () => {
    return String(Math.ceil(Math.random() * 1000));
  };

  const newPerson = request.body;

  if (!newPerson) {
    return response.status(400).send("No body provided");
  }

  if (!newPerson.name || !newPerson.number) {
    return response.status(400).send("Malformed body");
  }

  if (persons.find((p) => p.name === newPerson.name)) {
    return response.status(400).send("Person already exists");
  }

  newPerson.id = getNewId();

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.get("/info", (request, response) => {
  const date = new Date();
  console.log(date.toString());
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
      `<p>${date.toString()}</p>`,
  );
});

const PORT = 3001;
app.listen(3001, () => {
  console.log(`Running on port ${PORT}`);
});
