const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.models');
const userControllers = require('../controllers/todo.controllers');

router.get('/todo', userControllers.callTodos);

router.post('/todo', userControllers.createTodo);

router.get('/todo/:id', userControllers.callTodosById);

router.put('/todo/:id', userControllers.updateTodo);

router.delete('/todo/:id', userControllers.deleteTodo);

module.exports = router;
