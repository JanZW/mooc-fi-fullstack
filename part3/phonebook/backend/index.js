require("dotenv").config({ path: "../.env" });
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((people) => response.json(people))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        response.status(404);
      } else {
        response.json(person);
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const personId = request.params.id;

  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const newPerson = request.body;

  if (!newPerson) {
    return response.status(400).send("No body provided");
  }

  if (!newPerson.name || !newPerson.number) {
    return response.status(400).send("Malformed body");
  }

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }

    person.name = name;
    person.number = number;

    return person
      .save()
      .then((updatedPerson) => response.json(updatedPerson))
      .catch((error) => next(error));
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
      `<p>${date.toString()}</p>`,
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(3001, () => {
  console.log(`Running on port ${PORT}`);
});
