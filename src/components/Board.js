import React from 'react';
import Card from './Card';
import backlog from '../assets/Backlog.svg';
import done from '../assets/Done.svg';
import todo from '../assets/To-do.svg';
import cancelled from '../assets/Cancelled.svg';
import progress from '../assets/in-progress.svg';
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
      tickets: sortTickets(tickets.filter(ticket => ticket.status === status))
    }));
  };

  const groupByUser = () => {
    return users.map(user => ({
      title: user.name,
      tickets: sortTickets(tickets.filter(ticket => ticket.userId === user.id))
    }));
  };

  const groupByPriority = () => {
    const priorities = [4, 3, 2, 1, 0];
    return priorities.map(priority => ({
      title: getPriorityTitle(priority),
      tickets: sortTickets(tickets.filter(ticket => ticket.priority === priority))
    }));
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {groupedTickets.map((group, index) => (
        <div key={index} className="column">
          <div className="column-header">
            <h3>{group.title}</h3>
            <span>{group.tickets.length}</span>
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