import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { Task } from './interfaces/task.interface'
import { addTask, getTasks } from './api/tasks'
import { STATES } from './constants/response'

function App() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' }
    },
    typography: { fontFamily: '"Reddit Sans Condensed", sans-serif' }
  })

  useEffect(() => {
    const load = async () => {
      const response = await getTasks()
      if (response.status === STATES.SUCCESS) {
        setTaskList(response.data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('El título es obligatorio'),
      description: Yup.string().required('La descripción es obligatoria')
    }),
    onSubmit: async (values, { resetForm }) => {
      const response = await addTask(values)

      if (response.status === STATES.SUCCESS) {
        setTaskList((prev: Task[]) => [...prev, response.data as Task])
        resetForm()
      } else {
        alert('Error al agregar tarea')
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box className="p-6 max-w-6xl mx-auto">
        <Typography variant="h4" fontWeight="bold" className="mb-6">
          IAsk
        </Typography>

        <Box className="flex flex-col md:flex-row gap-6">
          <Card className="w-full md:w-1/3 shadow-md">
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                Agregar nueva tarea
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <Box className="flex flex-col gap-4 mt-5">
                  <TextField
                    label="Título"
                    name="title"
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />

                  <TextField
                    label="Descripción"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />

                  <Button type="submit" variant="contained">
                    Agregar tarea
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>

          <Box className="w-full md:w-2/3">
            {loading ? (
              <Typography>Cargando...</Typography>
            ) : taskList.length === 0 ? (
              <Typography>No hay tareas disponibles</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: '10%', verticalAlign: 'top' }}>Título</TableCell>
                      <TableCell sx={{ width: '15%', verticalAlign: 'top' }}>Descripción</TableCell>
                      <TableCell sx={{ width: '15%', verticalAlign: 'top' }}>Categoria</TableCell>
                      <TableCell sx={{ width: '10%', verticalAlign: 'top' }}>Completada</TableCell>
                      <TableCell sx={{ width: '50%', verticalAlign: 'top' }}>Subtareas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskList.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell sx={{ verticalAlign: 'top' }}>{task.title}</TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          {task.description || 'Sin descripción'}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>{task.category || '-'}</TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          {task.completed ? 'Sí' : 'No'}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top' }}>
                          {task.subtasks && task.subtasks.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {task.subtasks.map((subtask, index) => (
                                <li key={index}>{subtask}</li>
                              ))}
                            </ul>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
