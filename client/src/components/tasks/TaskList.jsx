import TaskItem from "./TaskItem";
function TaskList ({tasks, onDelete,onToggleStatus, onEdit}) {
    if(tasks.length === 0) {
        return ( 
                <div className="empty-state">
      <h3>No Tasks Yet</h3>

      <p>
        Create your first task to
        get started.
      </p>
    </div>
        );
    }
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} onEdit={onEdit}/>
            ))}
        </div>
    );
}

export default TaskList;