function TaskItem({
  task,
  onDelete,
  onToggleStatus,
  onEdit
}) {
  const isOverdue =
    task.dueDate &&
    task.status === "pending" &&
    new Date(task.dueDate) <
      new Date();

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        {task.priority === "high" &&
          "🔥 High"}

        {task.priority ===
          "medium" &&
          "🟡 Medium"}

        {task.priority ===
          "low" &&
          "🟢 Low"}
      </p>

      <p>
        📅{" "}
        {task.dueDate
          ? new Date(
              task.dueDate
            ).toLocaleDateString()
          : "No due date"}
      </p>

      <p>
        {task.status ===
        "completed"
          ? "✅ Completed"
          : "⏳ Pending"}
      </p>

      {isOverdue && (
        <p>⚠️ Overdue</p>
      )}

      <div className="task-actions">
        <button className="complete-btn"
          onClick={() =>
            onToggleStatus(task)
          }
        >
          {task.status ===
          "pending"
            ? "Complete"
            : "Pending"}
        </button>
        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="delete-btn"
          onClick={() =>
            onDelete(task._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;