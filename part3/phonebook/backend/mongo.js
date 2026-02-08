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

if (argn < 3){
    console.log('Provide password as argument')
    process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb://user:${password}@127.0.0.1:27017/people?authSource=admin`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


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
