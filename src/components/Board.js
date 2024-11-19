import React from 'react';
import Card from './Card';
import backlog from '../assets/Backlog.svg';
import done from '../assets/Done.svg';
import todo from '../assets/To-do.svg';
import cancelled from '../assets/Cancelled.svg';
import progress from '../assets/in-progress.svg';
import urgent from '../assets/urgentcolour.svg';
import high from '../assets/highpriority.svg';
import medium from '../assets/mediumpriority.svg';
import low from '../assets/lowpriority.svg';
import no from '../assets/nopriority.svg';
import add from '../assets/add.svg';
import menu from '../assets/3dotmenu.svg';
function Board({ tickets, users, grouping, sorting }) {
  const getPriorityTitle = (priority) => {
    const priorityTitles = {
      0: 'No priority',
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Urgent'
    };
    return priorityTitles[priority];
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'backlog':
        return <img src={backlog} alt="backlog" className="status-icon" />;
      case 'todo':
        return <img src={todo} alt="todo" className="status-icon" />;
      case 'in progress':
        return <img src={progress} alt="in progress" className="status-icon" />;
      case 'done':
        return <img src={done} alt="done" className="status-icon" />;
      case 'canceled':
        return <img src={cancelled} alt="cancelled" className="status-icon" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority) => {
    const priorityIcons = {
      0: <img src={no} alt="no priority" className="priority-icon" />,
      1: <img src={low} alt="low priority" className="priority-icon" />,
      2: <img src={medium} alt="medium priority" className="priority-icon" />,
      3: <img src={high} alt="high priority" className="priority-icon" />,
      4: <img src={urgent} alt="urgent priority" className="priority-icon" />
    };
    return priorityIcons[priority];
  };

  const getUserAvatar = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      return (
        <div className="user-avatar">
          {user.name.charAt(0)}
          <span className={`status-indicator ${user.available ? 'online' : 'offline'}`}></span>
        </div>
      );
    }
    return null;
  };

  const sortTickets = (ticketGroup) => {
    return ticketGroup.sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupTickets = () => {
    switch (grouping) {
      case 'status':
        return groupByStatus();
      case 'user':
        return groupByUser();
      case 'priority':
        return groupByPriority();
      default:
        return groupByStatus();
    }
  };

  const groupByStatus = () => {
    const allStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
    return allStatuses.map(status => ({
      title: status,
      icon: getStatusIcon(status),
      tickets: sortTickets(tickets.filter(ticket => ticket.status === status))
    }));
  };

  const groupByUser = () => {
    return users.map(user => ({
      title: user.name,
      icon: getUserAvatar(user.id),
      tickets: sortTickets(tickets.filter(ticket => ticket.userId === user.id))
    }));
  };

  const groupByPriority = () => {
    const priorities = [4, 3, 2, 1, 0];
    return priorities.map(priority => ({
      title: getPriorityTitle(priority),
      icon: getPriorityIcon(priority),
      tickets: sortTickets(tickets.filter(ticket => ticket.priority === priority))
    }));
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {groupedTickets.map((group, index) => (
        <div key={index} className="column">
          <div className="column-header">
          <div className="header-left">
              {group.icon}
              <h3>{group.title}</h3>
              <span className='c'>{group.tickets.length}</span>
            </div>
            <div className="header-right">
              <img src={add} alt="add" className="header-icon" />
              <img src={menu} alt="menu" className="header-icon" />
            </div>
          </div>
          <div className="column-cards">
            {group.tickets.map(ticket => (
              <Card 
                key={ticket.id}
                ticket={ticket}
                users={users}
                grouping={grouping}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
// import React from 'react';
// import Card from './Card';
// import backlog from '../assets/Backlog.svg';
// import done from '../assets/Done.svg';
// import todo from '../assets/To-do.svg';
// import cancelled from '../assets/Cancelled.svg';
// import progress from '../assets/in-progress.svg';
// function Board({ tickets, users, grouping, sorting }) {
//   const getPriorityTitle = (priority) => {
//     const priorityTitles = {
//       0: 'No priority',
//       1: 'Low',
//       2: 'Medium',
//       3: 'High',
//       4: 'Urgent'
//     };
//     return priorityTitles[priority];
//   };

//   const sortTickets = (ticketGroup) => {
//     return ticketGroup.sort((a, b) => {
//       if (sorting === 'priority') {
//         return b.priority - a.priority;
//       }
//       return a.title.localeCompare(b.title);
//     });
//   };

//   const groupTickets = () => {
//     switch (grouping) {
//       case 'status':
//         return groupByStatus();
//       case 'user':
//         return groupByUser();
//       case 'priority':
//         return groupByPriority();
//       default:
//         return groupByStatus();
//     }
//   };

//   const groupByStatus = () => {
//     const allStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
//     return allStatuses.map(status => ({
//       title: status,
//       tickets: sortTickets(tickets.filter(ticket => ticket.status === status))
//     }));
//   };

//   const groupByUser = () => {
//     return users.map(user => ({
//       title: user.name,
//       tickets: sortTickets(tickets.filter(ticket => ticket.userId === user.id))
//     }));
//   };

//   const groupByPriority = () => {
//     const priorities = [4, 3, 2, 1, 0];
//     return priorities.map(priority => ({
//       title: getPriorityTitle(priority),
//       tickets: sortTickets(tickets.filter(ticket => ticket.priority === priority))
//     }));
//   };

//   const groupedTickets = groupTickets();

//   return (
//     <div className="board">
//       {groupedTickets.map((group, index) => (
//         <div key={index} className="column">
//           <div className="column-header">
//             <h3>{group.title}</h3>
//             <span>{group.tickets.length}</span>

//           </div>
//           <div className="column-cards">
//             {group.tickets.map(ticket => (
//               <Card 
//                 key={ticket.id}
//                 ticket={ticket}
//                 users={users}
//                 grouping={grouping}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Board;