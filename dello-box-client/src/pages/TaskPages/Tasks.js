import React, { useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const tasksfrombackend = [
  {
    id: 3,
    user_id: 1,
    col_id: 1,
    start_date: '2021-11-14T10:30:00.000Z',
    end_date: '2021-11-18T16:30:00.000Z',
    title: 'task1',
    notes: 'Some notes here'
  },
  {
    id: 2,
    user_id: 2,
    col_id: 0,
    start_date: '2021-11-16T09:00:00.000Z',
    end_date: '2021-11-24T18:30:00.000Z',
    title: 'task2',
    notes: 'Some other notes here'
  },
  {
    id: 5,
    user_id: 1,
    col_id: 1,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 4,
    user_id: 2,
    col_id: 0,
    start_date: '2021-11-17T09:00:00.000Z',
    end_date: '2021-11-25T18:30:00.000Z',
    title: 'task4',
    notes: 'Blah blah blah'
  }
];
const columnsfrombackend = [
  {
    id: 0,
    label: 'first column',
    col_order: 0
  },
  {
    id: 1,
    label: 'second column',
    col_order: 1
  }
];
export default function Tasks() {
  const [tasks, setTask] = useState(tasksfrombackend);
  const [columns, setColumns] = useState(columnsfrombackend);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {columns.map((column) => {
          return (
            <Droppable droppableId={column.id.toString()}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      width: 250,
                      minHeight: 500
                    }}
                  >
                    {tasks
                      .filter((desired_tasks) => column.id === desired_tasks.col_id)
                      .map((task, index) => {
                        return (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    userSelect: 'none',
                                    padding: '16',
                                    margin: '0 0 8px 0',
                                    minHeight: '50',
                                    background: snapshot.isDragging ? '#263B4A' : '#456C86',
                                    color: 'white',
                                    ...provided.draggableProps.style
                                  }}
                                >
                                  {task.notes}
                                  {console.log(index)}
                                  {console.log('check')}
                                  {console.log(task.id)}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
  // <div>
  //   {columns.map((column_Order) => {
  //     console.log(column_Order.col_order);
  //     const desired_tasks = tasks.filter((des_tasks) => des_tasks.col_id === column_Order.id);
  //     console.log(desired_tasks);
  //     {
  //       return desired_tasks.map((des_tasks) => (
  //         <ListGroupItem>
  //           {des_tasks.id} {des_tasks.notes}
  //         </ListGroupItem>
  //       ));
  //     }
  //   })}
  //   {columns.map((column_Order) => (
  //     <Container>
  //       <Row>
  //         <Col>{column_Order.label}</Col>
  //       </Row>
  //     </Container>
  //   ))}
  //   {console.log(columns.col_id)}
  // </div>
}
