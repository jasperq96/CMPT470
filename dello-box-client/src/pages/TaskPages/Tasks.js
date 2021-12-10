import React, { useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const tasksfrombackend = [
  {
    id: 3,
    user_id: 1,
    col_id: 1,
    index: 0,
    start_date: '2021-11-14T10:30:00.000Z',
    end_date: '2021-11-18T16:30:00.000Z',
    title: 'task1',
    notes: 'Some notes here'
  },
  {
    id: 2,
    user_id: 1,
    col_id: 2,
    index: 0,
    start_date: '2021-11-16T09:00:00.000Z',
    end_date: '2021-11-24T18:30:00.000Z',
    title: 'task2',
    notes: 'Some other notes here'
  },
  {
    id: 5,
    user_id: 1,
    col_id: 1,
    index: 1,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 4,
    user_id: 1,
    col_id: 2,
    index: 1,
    start_date: '2021-11-17T09:00:00.000Z',
    end_date: '2021-11-25T18:30:00.000Z',
    title: 'task4',
    notes: 'Blah blah blah'
  },
  {
    id: 6,
    user_id: 1,
    col_id: 1,
    index: 2,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 7,
    user_id: 1,
    col_id: 1,
    index: 3,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 8,
    user_id: 1,
    col_id: 1,
    index: 4,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 9,
    user_id: 1,
    col_id: 1,
    index: 5,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 10,
    user_id: 1,
    col_id: 1,
    index: 6,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  }
];
const columnsfrombackend = [
  {
    id: 1,
    label: 'first column',
    col_order: 0
  },
  {
    id: 2,
    label: 'second column',
    col_order: 1
  },
  {
    id: 3,
    label: 'third column',
    col_order: 2
  },
  {
    id: 4,
    label: 'third column',
    col_order: 3
  },
  {
    id: 5,
    label: 'third column',
    col_order: 4
  },
  {
    id: 6,
    label: 'third column',
    col_order: 5
  },
  {
    id: 7,
    label: 'third column',
    col_order: 6
  },
  {
    id: 8,
    label: 'third column',
    col_order: 7
  },
  {
    id: 9,
    label: 'third column',
    col_order: 8
  },
  {
    id: 10,
    label: 'last column',
    col_order: 9
  }
];
const onDragEnd = (result, parsed_columns, setParsed_Columns) => {
  console.log('i am dragging');
  if (result.destination === null) {
    return;
  }
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const from_column = parsed_columns[source.droppableId];
    const to_column = parsed_columns[destination.droppableId];
    const column_array = [...parsed_columns];
    const from_tasks = [...from_column.col_tasks];
    const to_tasks = [...to_column.col_tasks];
    const [removed] = from_tasks.splice(source.index, 1);
    console.log('this is the removed task', removed);
    console.log(to_column);
    removed.col_id = to_column.id;
    to_tasks.splice(destination.index, 0, removed);
    to_tasks.forEach((task, index) => (task.index = index));
    from_tasks.forEach((task, index) => (task.index = index));
    column_array[source.droppableId].col_tasks = from_tasks;
    column_array[destination.droppableId].col_tasks = to_tasks;
    setParsed_Columns(column_array);
    console.log('i tried to move between columns', from_tasks, to_tasks);
  } else {
    const column_array = [...parsed_columns];
    const column = parsed_columns[source.droppableId];
    const copied_tasks = [...column.col_tasks];
    const [removed] = copied_tasks.splice(source.index, 1);
    copied_tasks.splice(destination.index, 0, removed);
    copied_tasks.forEach((task, index) => (task.index = index));
    column_array[source.droppableId].col_tasks = copied_tasks;
    setParsed_Columns(column_array);
    console.log('after setting parsed columns', column_array);
  }
};
export default function Tasks() {
  const [tasks, setTask] = useState(tasksfrombackend);
  const [columns, setColumns] = useState(columnsfrombackend);
  //const [parsed_columns, setParsed_Columns] = useState([]);
  const parsing_columns = [];
  for (let i = 0; i < columns.length; i++) {
    console.log(columns[i].label);
    const parsed_object = {
      id: columns[i].id,
      label: columns[i].label,
      col_order: columns[i].col_order,
      col_tasks: tasks.filter((desired_tasks) => columns[i].id === desired_tasks.col_id)
    };
    parsing_columns.push(parsed_object);
  }
  const [parsed_columns, setParsed_Columns] = useState(parsing_columns);
  //setParsed_Columns(parsing_columns);
  console.log(parsed_columns);

  return (
    <div style={{ display: 'flex', justifyContent: 'left', height: '100%' }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, parsed_columns, setParsed_Columns)}>
        {console.log('before the mapping', parsed_columns)}
        {parsed_columns.map((column) => {
          return (
            <div>
              <h2>{column.label}</h2>
              <Droppable droppableId={column.col_order.toString()} type="task" key={column.col_order}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 50
                      }}
                    >
                      {column.col_tasks.map((task, index) => {
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
            </div>
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
