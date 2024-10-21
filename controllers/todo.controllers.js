const Todo = require('../models/todo.models');

async function createTodo(req, res) {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'El título es requerido' });
  }

  const todo = new Todo({ title, description });
  try {
    const nuevoTodo = await todo.save();
    res.status(201).send(nuevoTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send('La tarea no se pudo crear');
  }
}

async function callTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener las tareas');
  }
}

async function callTodosById(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).send({ error: 'La tarea no fue encontrada' });
    }

    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener la tarea');
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).send({ error: 'La tarea no fue encontrada' });
    }

    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar la tarea');
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(404).send({ error: 'La tarea no fue encontrada' });
    }

    res.status(200).send({ message: 'La tarea fue borrada correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al borrar la tarea');
  }
}

module.exports = {
  callTodos,
  createTodo,
  callTodosById,
  updateTodo,
  deleteTodo,
};
