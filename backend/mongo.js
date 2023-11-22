const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give at least password as argument, and optionally name, number to add a person ')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url =
  `mongodb+srv://tobsel:${password}@cluster0.knf4xmf.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (password && name && number) {
  person.save().then(result => {
    console.log(`Added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (password && !(name || number)) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log('wrong amount of parameters')
  process.exit(1)
}