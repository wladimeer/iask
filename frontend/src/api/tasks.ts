import axios from 'axios'
import type { Task } from '../interfaces/task.interface'
import type { ApiResponse } from '../interfaces/api-response.interface'
import { STATES } from '../constants/response'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  validateStatus: () => true
})

const addTask = async (task: Task): Promise<ApiResponse<Task | null>> => {
  try {
    const { data } = await api.post<Task>('/tasks/', task)
    return {
      status: STATES.SUCCESS,
      message: 'Tarea agregada exitosamente',
      data
    }
  } catch {
    return {
      status: STATES.EXCEPTION,
      message: 'Ocurrió un error inesperado. Inténtalo más tarde',
      data: null
    }
  }
}

const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const { data } = await api.get<Task[]>('/tasks/')
    return {
      status: STATES.SUCCESS,
      message: 'Tareas obtenidas exitosamente',
      data: data as Task[]
    }
  } catch {
    return {
      status: STATES.EXCEPTION,
      message: 'Ocurrió un error inesperado. Inténtalo más tarde',
      data: []
    }
  }
}

export { addTask, getTasks }
