import { useState, useEffect } from "react"

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import './style/App.css';

function App() {
  // const name = "Kenneth"
  const [showAddtask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    // console.log(task)
    // const id = Math.floor(Math.random() * 100) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    // console.log('Delete', id)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    // console.log(id)
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <div className="container">
      <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddtask)} showAdd={showAddtask}></Header>
      {showAddtask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to show'}
      {/* <Header title="Hello Kenneth" age={23}></Header>
      <h1>Hello form React</h1>
      <h2>Hello {name}</h2> */}
    </div>
  );
}

export default App;
