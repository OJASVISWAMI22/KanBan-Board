import React from 'react';
import urgent from '../assets/urgentcolour.svg';
import high from '../assets/highpriority.svg';
import medium from '../assets/mediumpriority.svg';
import low from '../assets/lowpriority.svg';
import no from '../assets/nopriority.svg';
import menu from '../assets/3dotmenu.svg';
import backlog from '../assets/Backlog.svg';
import done from '../assets/Done.svg';
import todo from '../assets/To-do.svg';
import cancelled from '../assets/Cancelled.svg';
import progress from '../assets/in-progress.svg';
function Card({ ticket, users, grouping }) {
  const getUser = () => {
    return users.find(user => user.id === ticket.userId);
  };

  const getStatusIcon=()=>{
    switch (ticket.status.toLowerCase()) {
      case 'backlog':
        return <img src={backlog}  className="status-icon" />;
      case 'todo':
        return <img src={todo}  className="status-icon" />;
      case 'in progress':
        return <img src={progress}  className="status-icon" />;
      case 'done':
        return <img src={done}  className="status-icon" />;
      case 'canceled':
        return <img src={cancelled} className="status-icon" />;
      default:
        return <img src={todo}  className="status-icon" />;
    }
  }
  const getPriorityIcon = () => {
    const priorityIcons = {
      0: <img src={no}></img>,
      1: <img src={low}></img>,
      2: <img src={medium}></img>,
      3: <img src={high}></img>,
      4: <img src={urgent}></img>
    };
    return priorityIcons[ticket.priority];
  };

  const user = getUser();

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== 'user' && user && (
          <div className="user-avatar">
            {user.name.charAt(0)}
            <span className={`status-indicator ${user.available ? 'online' : 'offline'}`}></span>
          </div>
        )}
      </div>
      <div className="card-title">
      {grouping !== 'status' && getStatusIcon()}
        <p>{ticket.title}</p>
      </div>
      <div className="card-footer">
        <div className="priority-icon">{grouping !== 'priority' && getPriorityIcon()}</div>
        <div className="tag-container">
          {ticket.tag.map((tag, index) => (
            <div key={index} className="tag">
              <img src={menu} />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;