import { useEffect, useState } from 'react'
import { getTasks } from './api/tasks'

function App() {
  const loadTasks = async () => {
    const response = await getTasks()
    console.log({ response })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <div className=""></div>
    </>
  )
}

export default App
