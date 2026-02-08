require('dotenv').config({path: '../.env'})
const Person = require('./models/person')
const mongoose = require('mongoose');

const listAll = () => {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
        mongoose.connection.close();
    })
};

const insertPerson = (person) => {
    person.save().then(
        () => {
            console.log(`added ${person.name} ${person.number} to phonebook`)
        }
    ).catch(
        e => console.log(`Error while entering ${person}: ${e}`)
    ).then(
        () => mongoose.connection.close()
    )
};

const argn = process.argv.length;

if (argn === 3) {
    listAll();
} else if (argn === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    insertPerson(person);
} else {
    console.log('Unexpected number of arguments')
    process.exit(1)
}
