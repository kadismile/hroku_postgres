const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  async create(req, res) {
    try {
      let todo = await Todo.create({
        title: req.body.title
      })
      return res.status(201).send(todo)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
};