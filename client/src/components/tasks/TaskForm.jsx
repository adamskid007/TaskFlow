import { useState,useEffect } from "react";

function TaskForm({onAddTask, editingTask,onUpdateTask,}) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        if(editingTask) {
            onUpdateTask ({
                ...editingTask,
                title,
                priority,
                dueDate,
            });
        }else{
        onAddTask({ title, priority, dueDate, });
        setTitle("");
        }

    };

    useEffect(() => {
        if(editingTask) {
            setTitle(editingTask.title);

            setPriority(editingTask.priority);

            setDueDate(editingTask.dueDate?.split("T")[0] || "")
        };
    }, [editingTask]);
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="taskform-container">
            <input type="text" placeholder="Enter task..." value={title} onChange={(e) => setTitle(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
            </div>
            
            <button type="submit" className="primary-btn">
                {editingTask ? "Update Task" : "Add Task"}
            </button>
        </form>
    );

}

export default TaskForm;