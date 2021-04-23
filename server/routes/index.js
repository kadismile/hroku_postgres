const { protect, authorize } = require('../middleware/auth');

const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const authController = require('../controllers').authentication;
const regController = require('../controllers').registration;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.post('/api/auth/register', authController.create);
  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/user',protect, authController.getUser);
  app.post('/api/registrations', regController.create);
  app.get('/api/registrations', protect, regController.list);
  app.post('/api/registration-remove', protect, regController.remove);



};