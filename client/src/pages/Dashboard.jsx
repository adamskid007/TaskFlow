import { useEffect,useState } from "react";
import { getTasks,createTask,deleteTask,updateTask } from "../services/taskService";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import "../styles/dashboard.css";
import Navbar from "../components/layout/Navbar";
import StatsCards from "../components/dashboard/StatsCards";
import { toast } from "react-toastify";
import Sidebar from "../components/layout/Sidebar";


function Dashboard() {
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
  

  const totalTasks = tasks.length;
  
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const overdueTasks = tasks.filter((task) => task.status === "pending" && task.dueDate && new Date(task.dueDate) < new Date()).length;

  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;

  const today = new Date();
  const tasksDueToday = tasks.filter((task) => {
    if (!task.dueDate) return false
    const due = new Date(task.dueDate);
    return (due.toDateString() === today.toDateString());
  }).length
if (loading) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading Dashboard...</p>
    </div>
  );
}
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="dashboard-container">
        <Navbar />
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Manage your tasks and stay
              productive.
            </p>
          </div>
        </div>
        <div>
          <StatsCards
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
            overdueTasks={overdueTasks}
            highPriorityTasks={highPriorityTasks}
            tasksDueToday={tasksDueToday}
            completionRate={completionRate}
          />
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

        <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} onToggleStatus={handleToggleStatus} onEdit={handleEditTask}/>
        <footer className="footer">
          © 2026 TaskFlow
        </footer>
      </div>

    </div>
    
  );
}

export default Dashboard;