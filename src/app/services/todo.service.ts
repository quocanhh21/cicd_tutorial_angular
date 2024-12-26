import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7191/api/todo';

  constructor(private http: HttpClient) {}

  // GET all items
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  // GET a single item by ID
  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  // POST: Add a new item
  addTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  // PUT: Update an item
  updateTodo(id: number, todo: TodoItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, todo);
  }

  // DELETE: Remove an item
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
