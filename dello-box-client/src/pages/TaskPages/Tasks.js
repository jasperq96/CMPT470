import React, { useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button, Modal, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Task.css';
import Modal_tasks from '../../components/Modal_tasks';
import { render } from 'react-dom';
const tasksfrombackend = [
  {
    id: 3,
    user_id: 1,
    col_id: 20,
    index: 0,
    start_date: '2021-11-14T10:30:00.000Z',
    end_date: '2021-11-18T16:30:00.000Z',
    title: 'task1',
    notes: 'Some notes here'
  },
  {
    id: 2,
    user_id: 1,
    col_id: 20,
    index: 1,
    start_date: '2021-11-16T09:00:00.000Z',
    end_date: '2021-11-24T18:30:00.000Z',
    title: 'task2',
    notes: 'Some other notes here'
  },
  {
    id: 5,
    user_id: 1,
    col_id: 20,
    index: 2,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 4,
    user_id: 1,
    col_id: 20,
    index: 3,
    start_date: '2021-11-17T09:00:00.000Z',
    end_date: '2021-11-25T18:30:00.000Z',
    title: 'task4',
    notes: 'Blah blah blah'
  },
  {
    id: 6,
    user_id: 1,
    col_id: 20,
    index: 4,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 7,
    user_id: 1,
    col_id: 20,
    index: 5,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 8,
    user_id: 1,
    col_id: 20,
    index: 6,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 9,
    user_id: 1,
    col_id: 1,
    index: 7,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  },
  {
    id: 10,
    user_id: 1,
    col_id: 1,
    index: 8,
    start_date: '2021-11-13T10:30:00.000Z',
    end_date: '2021-11-19T16:30:00.000Z',
    title: 'task3',
    notes: 'More notes here'
  }
];
const columnsfrombackend = [
  {
    id: 20,
    label: 'first column',
    col_order: 0
  },
  {
    id: 21,
    label: 'second column',
    col_order: 1
  },
  {
    id: 22,
    label: 'third column',
    col_order: 2
  },
  {
    id: 23,
    label: 'third column',
    col_order: 3
  },
  {
    id: 24,
    label: 'third column',
    col_order: 4
  }
  // {
  //   id: 25,
  //   label: 'third column',
  //   col_order: 5
  // },
  // {
  //   id: 26,
  //   label: 'third column',
  //   col_order: 6
  // },
  // {
  //   id: 27,
  //   label: 'third column',
  //   col_order: 7
  // },
  // {
  //   id: 28,
  //   label: 'third column',
  //   col_order: 8
  // },
  // {
  //   id: 29,
  //   label: 'last column',
  //   col_order: 9
  // },
  // {
  //   id: 30,
  //   label: 'last column',
  //   col_order: 10
  // },
  // {
  //   id: 31,
  //   label: 'This is a really long column with a really long title',
  //   col_order: 11
  // },
  // {
  //   id: 32,
  //   label: 'last column',
  //   col_order: 12
  // },
  // {
  //   id: 33,
  //   label: 'last column',
  //   col_order: 13
  // },
  // {
  //   id: 34,
  //   label: 'last column',
  //   col_order: 14
  // },
  // {
  //   id: 35,
  //   label: 'last column',
  //   col_order: 15
  // }
];

const onDragEnd = (result, parsed_columns, setParsed_Columns) => {
  console.log('i am dragging');
  if (result.destination === null) {
    return;
  }
  const { source, destination, type } = result;
  console.log('before i move columns');
  console.log(type);
  if (type === 'column') {
    const column_array = [...parsed_columns];
    const [removed] = column_array.splice(source.index, 1);
    column_array.splice(destination.index, 0, removed);
    console.log('I am moving columns', column_array);
    column_array.forEach((col, index) => (col.col_order = index));
    setParsed_Columns(column_array);
  } else {
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
  }
};

export default function Tasks() {
  const [tasks, setTask] = useState(tasksfrombackend);
  const [columns, setColumns] = useState(columnsfrombackend);
  const [task_modal, setTask_Modal] = useState(false);
  const [column_modal, setColumn_Modal] = useState(false);
  const [column_index, setColumn_Index] = useState(0);
  const [task_index, setTask_Index] = useState(0);
  //const [parsed_columns, setParsed_Columns] = useState([]);
  const onDeleteModal = (evt) => {
    evt.stopPropagation();
    setTask_Modal(true);
  };
  const onModalClose = () => {
    setTask_Modal(false);
    return;
  };

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
  //onDragEnd(result, parsed_columns, setParsed_Columns)
  const onTaskDelete = (task, index) => {
    console.log(parsed_columns);
    console.log('heloooooooooooooooo', task.col_id);
    const column_array = [...parsed_columns];
    const column = parsed_columns.filter((col) => col.id === task.col_id);
    console.log('these are the columns', column);
    console.log('these are the column tasks', column[0].col_tasks);
    const copied_tasks = [...column[0].col_tasks];
    console.log('these are the copied tasks', copied_tasks);
    copied_tasks.splice(index, 1);
    copied_tasks.forEach((task, index) => (task.index = index));
    console.log(column_array[task.col_id]);
    console.log(task.col_id);
    for (let i = 0; i < column_array.length; i++) {
      if (column_array[i].id === task.col_id) {
        console.log('test');
        column_array[i].col_tasks = copied_tasks;
      }
    }
    //column_array[task.col_id].col_tasks = copied_tasks;
    console.log(column_array);
    setParsed_Columns(column_array);
    console.log(parsed_columns);
    console.log('click', task, index);
    setTask_Modal(false);
    return;
  };

  return (
    <Container fluid style={{ paddingTop: 50 }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, parsed_columns, setParsed_Columns)}>
        {console.log('before the mapping', parsed_columns)}
        <Droppable droppableId="all_columns" direction="horizontal" type="column">
          {(provided, snapshot) => {
            return (
              <div
                className="justify-content-left"
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: 'flex', flexDirection: 'row', background: snapshot.isDraggingOver ? 'lightblue' : 'white' }}
              >
                {parsed_columns.map((column, index) => {
                  return (
                    <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <Col md="auto" ref={provided.innerRef} {...provided.draggableProps}>
                            <h2 {...provided.dragHandleProps} style={{ margin: 8, justifyContent: 'center' }}>
                              {column.label}
                            </h2>
                            <div style={{ margin: 8 }}>
                              <Droppable droppableId={column.col_order.toString()} type="task" key={column.col_order}>
                                {(provided, snapshot) => {
                                  return (
                                    <ListGroup
                                      md="auto"
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      style={{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        minHeight: 50,
                                        minWidth: 300
                                      }}
                                    >
                                      {column.col_tasks.map((task, index) => {
                                        return (
                                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided, snapshot) => {
                                              return (
                                                <ListGroupItem
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  ref={provided.innerRef}
                                                  style={{
                                                    userSelect: 'none',
                                                    padding: '50',
                                                    margin: '0 0 5px 0',
                                                    minHeight: '50',
                                                    background: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                    color: 'white',
                                                    ...provided.draggableProps.style
                                                  }}
                                                >
                                                  {task.id}
                                                  {task.notes}
                                                  <ListGroup style={{ display: 'inline-flex', float: 'right' }}>
                                                    <Modal_tasks index={task_index} show={task_modal} task={task} onModalClose={onModalClose} onTaskDelete={onTaskDelete} />

                                                    <Button
                                                      variant="danger"
                                                      onClick={(e) => {
                                                        onDeleteModal(e);
                                                        setTask_Index(task.index);
                                                      }}
                                                    >
                                                      X
                                                    </Button>
                                                    {console.log(task_modal)}
                                                    <Button
                                                      variant="dark"
                                                      onClick={(e) => {
                                                        onDeleteModal(e);
                                                        setTask_Index(task.index);
                                                      }}
                                                    >
                                                      Edit{' '}
                                                    </Button>
                                                  </ListGroup>
                                                </ListGroupItem>
                                              );
                                            }}
                                          </Draggable>
                                        );
                                      })}
                                      {provided.placeholder}
                                    </ListGroup>
                                  );
                                }}
                              </Droppable>
                            </div>
                          </Col>
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
      </DragDropContext>
    </Container>
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
