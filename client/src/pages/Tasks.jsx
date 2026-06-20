import { useEffect,useState } from "react";
import { getTasks,createTask,deleteTask,updateTask } from "../services/taskService";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import "../styles/dashboard.css";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { toast } from "react-toastify";
function Tasks () {
      const [tasks, setTasks] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [statusFilter, setStatusFilter] = useState("all");
      const [priorityFilter, setPriorityFilter] = useState("all");
      // const user = JSON.parse(localStorage.getItem("user"));
      const [editingTask, setEditingTask] = useState(null);
      const [loading, setLoading] = useState(true);

        const loadTasks = async () => {
          try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data.tasks);
          } catch (error) {
            console.error(error)
          } finally{
            setLoading(false);
          }
      
        };
        useEffect(() => {
          loadTasks();
        }, []);
      
        const handleAddTask = async (taskData) => {
          try {
            await createTask(taskData);
            toast.success("Task created successfully!");
      
            loadTasks();
          } catch (error) {
            toast.error("Failed to create task")
          }
        }
      
        const handleDeleteTask = async (taskId) => {
          try {
            await deleteTask(taskId);
            toast.success("Task deleted ")
      
            loadTasks();
          } catch (error) {
            toast.error("Failed to delete task");
          }
        };
        const handleToggleStatus = async (task) => {
          try {
            await updateTask(task._id, {
              status: task.status === "pending" ? "completed" : "pending"
            });
            toast.success("Task updated")
            loadTasks();
          } catch (error) {
            toast.error("Failed to update task");
          }
        };
        const handleEditTask = (task) => {
          setEditingTask(task);
        } 
      
        const handleUpdateTask = async (taskData) => {
          try {
            await updateTask(taskData._id, taskData);
            toast.success("Task updated successfully");
            setEditingTask(null);
            loadTasks();
          } catch (error) {
            toast.error("Failed to update task");
          }
        };
          const filteredTasks = tasks.filter((task) => {
   const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

   const matchesStatus = statusFilter === "all" || task.status === statusFilter;

   const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
   return(matchesSearch && matchesStatus && matchesPriority);
  });
      if (loading) {
        return <p>Loading...</p>;
        }
    return(
        <div className="app-layout">
            <Sidebar />

            <div className="dashboard-container">
                <Navbar />

                <div className="tasks-header">
                <h1>Tasks</h1>
                <p>Manage all your tasks in one place.</p>
                </div>

                <div className="tasks-filter-section">
                    <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    </select>
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    </select>
                </div>

                <div className="tasks-form-section">
                <h2>Add New Task</h2>

                <TaskForm
                    onAddTask={handleAddTask}
                    editingTask={editingTask}
                    onUpdateTask={handleUpdateTask}
                />
                </div>

                <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditTask}
                />
                    <footer className="footer">
                © 2026 TaskFlow
                </footer>
            </div>
            </div>
    )
}

export default Tasks;