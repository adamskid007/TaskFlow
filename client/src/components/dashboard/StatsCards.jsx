function StatsCards({
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    highPriorityTasks,
    tasksDueToday,
    completionRate,
}){
    const cards = [
        {
            title: "Total Tasks",
            value: totalTasks,
        },
        {
            title: "Completed",
            value: completedTasks,
        },
        {
            title: "Pending",
            value: pendingTasks,
        },
        {
            title: "Overdue",
            value: overdueTasks,
        },
        {
            title: "High Priority",
            value: highPriorityTasks,
        },
        {
            title: "Due Today",
            value: tasksDueToday,
        },
        {
            title: "Completion %",
            value: `${completionRate}%`,
        },
        
    ];

    return (
        <div className="stats-grid">
            {cards.map((card) => (
                <div key={card.title} className="stat-card">
                    <h3>{card.title}</h3>
                    <p>{card.value}</p>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;