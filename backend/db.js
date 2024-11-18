const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hamzanabeel:fGEWk94J7ktkKpTB@cluster0.yjnye.mongodb.net/courseDB")

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo: todo
}