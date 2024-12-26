import { Component, OnInit } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  imports: [FormsModule],
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  // Load all To-Do items
  loadTodos(): void {
    this.todoService.getTodos().subscribe((data) => (this.todos = data));
  }

  // Add a new To-Do item
  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo: TodoItem = { id: 0, name: this.newTodo, isComplete: false };
      this.todoService.addTodo(todo).subscribe(() => {
        this.newTodo = '';
        this.loadTodos();
      });
    }
  }

  // Update a To-Do item
  toggleComplete(todo: TodoItem): void {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe(() => this.loadTodos());
  }

  // Delete a To-Do item
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
