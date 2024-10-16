import './Card.css';


const Card = ({ task, priority, grouping, users}) => {
    
    const tag=task.tag.join(', ');

    const user = users.find(user => user.id === task.userId);
    const getColorFromInitial = (initial) => {
        const charCode = initial.toUpperCase().charCodeAt(0);
        const r = (charCode * 17) % 128; 
        const g = (charCode * 31) % 128; 
        const b = (charCode * 47) % 128;
        return `rgb(${r}, ${g}, ${b})`; 
    };

return (
    <div className="card-container">
        <div className="card-header">
            <span className="ticket-id">{task.id}</span>
            {grouping !== 'user' && <span className="user-initial"   
            style={ {backgroundColor: getColorFromInitial(user.name.charAt(0)) }}>
                {user ? user.name.charAt(0).toUpperCase() : task.userId.charAt(0).toUpperCase()}
            </span>
}
        </div>
        <div className="card-title">
            {(grouping === 'user' || grouping === 'priority') && (
                <img src={`/${task.status}.svg`} alt={task.status} />
            )}
            <h3>{task.title}</h3>
        </div>
        <div className="card-details">
            {(grouping === 'user' || grouping === 'status') && (
                <img src={`/${priority}.svg`} alt={task.priority} className='priority-img' />
            )}
            <span className="ticket-type">
                <span className="circle"></span>
                {tag}
            </span>
        </div>
    </div>
)
}

export default Card

