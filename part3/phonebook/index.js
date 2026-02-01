const express = require("express");

const app = express();

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
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;

  const person = persons.find((p) => p.id === personId);

  if (!person) {
    response.status(404);
  }

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = request.params.id;

  persons = persons.filter((p) => p.id !== personId);

  response.status(204);
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
