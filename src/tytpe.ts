export interface Todo {
  id: number
  title: string,
  completed: boolean
}

export interface TodoFormProps {
  onAddTodo: (text: string) => void
}