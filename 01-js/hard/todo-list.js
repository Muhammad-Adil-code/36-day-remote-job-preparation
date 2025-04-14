class Todo {
  constructor() {
    this.todos = [];
  }
  
  add(Todo) {
    this.todos.push(Todo);
  }

  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      this.todos.splice(indexOfTodo, 1);
      return true;
    } else {
      return false; // Invalid index
    }
  }

  update(index, updatedTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updatedTodo;
      return true;
    } else {
      return false; // Invalid index
    }
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      return this.todos[indexOfTodo];
    } else {
      return null; // Invalid index
    }
  }

  clear() {
    this.todos = [];
  }
}


module.exports = Todo;