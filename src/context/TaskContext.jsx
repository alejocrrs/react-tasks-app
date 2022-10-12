import { createContext, useState, useEffect } from 'react'
import { tasks as data } from '../data/tasks'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const TaskContext = createContext()

export function TaskContextProvider(props) {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks(data)
    }, [])

    function createTask(title, description) {
        const newTask = {
            id: tasks.length + 1,
            title: title,
            description: description
        }
        setTasks([...tasks, newTask])

        toast.success('Tarea añadida correctamente.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))

        toast.success('Tarea eliminada correctamente.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
            <ToastContainer />
            {props.children}
        </TaskContext.Provider>
    )
}