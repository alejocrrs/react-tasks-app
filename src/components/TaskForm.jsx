import { useState, useContext } from 'react'
import { TaskContext } from '../context/TaskContext'

export default function TaskForm() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    const { createTask } = useContext(TaskContext)

    function verifyForm() {
        let hayError = false

        if (title === "") {
            setTitleError(true)
            hayError = true
        }
        else {
            setTitleError(false)
        }

        if (description === "") {
            setDescriptionError(true)
            hayError = true
        }
        else {
            setDescriptionError(false)
        }


        if (hayError) {
            return false
        }
        else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (verifyForm()) {
            createTask(title, description)
            setTitle("")
            setDescription("")
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-800 p-10 mb-4">
                <h1 className="text-2xl font-bold text-white mb-3">Crear tarea</h1>
                <div className="mb-4">
                    <input type="text" placeholder="Título"
                        onChange={(e) => { setTitle(e.target.value) }} value={title} autoFocus
                        className="bg-slate-300 p-3 w-full rounded-md"
                    />
                    {titleError ?
                        <span className="text-red-500 italic">Ingresa el título.</span> :
                        null
                    }
                </div>
                <div className="mb-4">
                    <textarea placeholder="Descripción"
                        onChange={(e) => { setDescription(e.target.value) }} value={description}
                        className="bg-slate-300 p-3 w-full rounded-md">
                    </textarea>
                    {descriptionError ?
                        <span className="text-red-500 italic">Ingresa la descripción.</span> :
                        null
                    }
                </div>
                <button className="bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-400 rounded-md">Guardar</button>
            </form>
        </div>
    )
}