import { Todo } from './tytpe'

// let todos: Todo[] = []
// let completed: number[] = []
let currentId = Date.now()

export const delay = () => new Promise<void>((res) => setTimeout(() => res(), 300));

export const removeAll = () => {
  clearLocalStorage()
  return []
}

export async function getTodos(): Promise<Todo[]> {
  // await delay()
  const storedTodos = localStorage.getItem('todos')
  let todos: Todo[] = []
  if (storedTodos) {
    todos = JSON.parse(storedTodos)
  }
  return todos
}
export async function getCompletedTodos(): Promise<number[]> {
  let completed: number[] = []
  const storedCompletedTodos = localStorage.getItem('completedTodos')
  if (storedCompletedTodos) {
    completed = JSON.parse(storedCompletedTodos)
  }
  // await delay()
  return completed
}

export async function addCompleted(completed: number[]): Promise<number[]> {
  // await delay()
  updateLocalStorage('completedTodos', completed)
  return completed
}
export async function addTodo(todo: Todo): Promise<Todo[]> {
  let todos = await getTodos()
  // await delay()
  todos = [...todos, { ...todo, id: currentId++ }]
  updateLocalStorage('todos', todos)
  return todos
}

export async function updateTodo(updatedTodo: Todo): Promise<Todo[]> {
  let todos = await getTodos()
  // await delay()
  todos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
  updateLocalStorage('todos', todos)
  return todos
}

export async function deleteTodo(todoId: number): Promise<Todo[]> {
  let todos = await getTodos()
  // await delay()
  todos = todos.filter((todo) => todo.id !== todoId)
  updateLocalStorage('todos', todos)
  return todos
}

// Helper function to update Local Storage
function updateLocalStorage(field, updatedData) {
  localStorage.setItem(field, JSON.stringify(updatedData))
}
// clear local storage
export function clearLocalStorage() {
  localStorage.removeItem('todos');
  localStorage.removeItem('completedTodos');
}