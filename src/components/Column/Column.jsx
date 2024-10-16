import React from 'react';
import Card from '../Cards/Card';
import './Column.css'




const Column = ({ title, tickets, ordering, grouping , users}) => {
  const priorityMap = { 0: 'No Priority', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' };

  const sortedTasks = [...tickets].sort((a, b) => {
    if (ordering === 'priority') {
      return a.priority - b.priority;
    } else if (ordering === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
const getColorFromInitial = (initial) => {
    const charCode = initial.toUpperCase().charCodeAt(0);
    const r = (charCode * 17) % 128; 
    const g = (charCode * 31) % 128; 
    const b = (charCode * 47) % 128;
    return `rgb(${r}, ${g}, ${b})`; 
};

return (
    <div className="column">
        <div className="column-header">
            <div className="column-name">
                {grouping === 'user' ? (
                    <>
                        <span
                            className="user-initial"
                            style={{ backgroundColor: getColorFromInitial(title.charAt(0)) }}
                        >
                            {title.charAt(0).toUpperCase()}
                        </span>
                    </>
                ) : (
                    <img src={`/${title}.svg`} alt={title} className="column-title-icon" />
                )}
                <h3>{title}</h3>
                <span className="column-card-count">{tickets.length}</span>
            </div>
            <div className="column-actions">
                <img src="/add.svg" alt="Add" className="column-add-icon" />
                <img src="/3-dot-menu.svg" alt="Menu" className="column-menu-icon" />
            </div>
        </div>
        <div className="column-cards">
            {sortedTasks.map((task) => (
                <Card
                    key={task.id}
                    task={task}
                    title={title}
                    priority={priorityMap[task.priority]}
                    grouping={grouping}
                    users={users}
                />
            ))}
        </div>
    </div>
);
};

export default Column;
