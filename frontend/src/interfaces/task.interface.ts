interface Task {
  id?: number
  title: string
  description: string
  completed?: boolean
  category?: string
  subtasks?: string[]
}

export type { Task }
