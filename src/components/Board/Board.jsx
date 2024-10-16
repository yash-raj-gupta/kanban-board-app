import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Column from '../Column/Column';
import './Board.css'

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status'); // Default grouping
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority'); // Default ordering
    const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
          const { tickets, users } = response.data;
          setTickets(tickets);
          setUsers(users);
        } catch (error) {
        
          console.error('Error fetching data');
        }
      };
  
      fetchData();
    }, []);

    const getTicketsByUser = (userId) => tickets.filter((task) => task.userId === userId);

    const handleGroupingChange = (e) => {
        const newGrouping = e.target.value;
        setGrouping(newGrouping);
        localStorage.setItem('grouping', newGrouping); // Save grouping to localStorage
      };
    
      const handleOrderingChange = (e) => {
        const newOrdering = e.target.value;
        setOrdering(newOrdering);
        localStorage.setItem('ordering', newOrdering); // Save ordering to localStorage
      };

    useEffect(() => {
        let numberOfCols = 0;
        if (grouping === 'status') {
            numberOfCols = 5; // Backlog, Todo, In Progress, Done, Cancelled
        } else if (grouping === 'user') {
            numberOfCols = users.length;
        } else if (grouping === 'priority') {
            numberOfCols = 5; // High Priority, Medium Priority, Low Priority
        }
        document.documentElement.style.setProperty('--number-of-columns', numberOfCols);

    }, [grouping, users]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.board-header')) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

return (
    <div className="kanban-board">
        <div className="board-header">
            <button className="display-button" onClick={() => setShowMenu(!showMenu)}>
                <img src="/Display.svg" alt="Display" />
                Display
                <img src="/down.svg" alt="Down" />
            </button>
            {showMenu && (
                <div className="controls">
                    <div className="control-value">
                        <h3>Grouping</h3>
                        <select value={grouping} onChange={handleGroupingChange}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className="control-value">
                        <h3>Ordering</h3>
                        <select value={ordering} onChange={handleOrderingChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
        <div className="board-columns">
            {grouping === 'status' && (
                <div className='column-layout'>
                    <Column title="Backlog" tickets={tickets.filter((task) => task.status === 'Backlog')} ordering={ordering} grouping={grouping} users={users}  />
                    <Column title="Todo" tickets={tickets.filter((task) => task.status === 'Todo')} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="In progress" tickets={tickets.filter((task) => task.status === 'In progress')} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="Done" tickets={tickets.filter((task) => task.status === 'Done')} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="Cancelled" tickets={tickets.filter((task) => task.status === 'Cancelled')} ordering={ordering} grouping={grouping} users={users}/>
                    

                </div>
            )}
            {grouping === 'user' && (
                <div className='column-layout'>
                    {users.map((user) => (
                        <Column key={user.id} title={user.name} tickets={getTicketsByUser(user.id)} ordering={ordering} grouping={grouping} users={users}/>
                    ))}
                </div>
            )}
            {grouping === 'priority' && (
                <div className='column-layout'>
                    <Column title="No Priority" tickets={tickets.filter((task) => task.priority === 0)} ordering={ordering} grouping={grouping} users={users} />
                    <Column title="Urgent" tickets={tickets.filter((task) => task.priority === 4)} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="High" tickets={tickets.filter((task) => task.priority === 3)} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="Medium" tickets={tickets.filter((task) => task.priority === 2)} ordering={ordering} grouping={grouping} users={users}/>
                    <Column title="Low" tickets={tickets.filter((task) => task.priority ===  1)} ordering={ordering} grouping={grouping} users={users} />
                </div>
            )}
        </div>
    </div>
);
};
export default KanbanBoard;
