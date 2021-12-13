import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UserContext } from '../../hooks/UserContext';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { capitalize } from '../../utils/capitalizeString';
import '../../stylesheets/Tasks.css';
import ModalTasks from '../../components/ModalTasks';
import ModalColumns from '../../components/ModalColumns';
import ModalColumnsEdit from '../../components/ModalColumnsEdit';
import ModalTaskEdit from '../../components/ModalTaskEdit';
import ManageEmpty from '../../components/ManageEmpty';
const editColumnOrder = async (updatedColumns) => {
  const url = '/column/order';
  try {
    await httpService.put(url, updatedColumns);
    toast.success('Successfully saved!');
  } catch (error) {
    // Will display the first input error message
    const errorBody = error.response.data.errors[0];
    toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    return false;
  }
};

const editTaskOrder = async (updatedTasks) => {
  const url = '/task/order';
  try {
    await httpService.put(url, updatedTasks);
    toast.success('Successfully saved!');
  } catch (error) {
    // Will display the first input error message
    const errorBody = error.response.data.errors[0];
    toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    return false;
  }
};

const onDragEnd = (result, parsed_columns, setParsed_Columns) => {
  if (result.destination === null) {
    return;
  }
  const { source, destination, type } = result;
  if (type === 'column') {
    const column_array = [...parsed_columns];
    //column_array
    const [removed] = column_array.splice(source.index, 1);
    // removed object is the column being moved
    column_array.splice(destination.index, 0, removed);
    column_array.forEach((col, index) => (col.col_order = index));
    const pass_backend = column_array.map(({ col_tasks, ...keptattr }) => keptattr);
    //of the columns
    editColumnOrder({ columns: pass_backend });
    setParsed_Columns(column_array);
  } else {
    if (source.droppableId !== destination.droppableId) {
      //moving between columns
      const from_column = parsed_columns[source.droppableId];
      const to_column = parsed_columns[destination.droppableId];
      const column_array = [...parsed_columns];
      const from_tasks = [...from_column.col_tasks];
      const to_tasks = [...to_column.col_tasks];
      const [removed] = from_tasks.splice(source.index, 1);
      removed.col_id = to_column.id;
      to_tasks.splice(destination.index, 0, removed);
      to_tasks.forEach((task, index) => (task.index = index));
      from_tasks.forEach((task, index) => (task.index = index));
      column_array[source.droppableId].col_tasks = from_tasks;
      column_array[destination.droppableId].col_tasks = to_tasks; // reformat this to pass both tasks lists in a single list make sure indeces arent fucked BACKEND
      const pass_double_task = [...from_tasks, ...to_tasks];
      editTaskOrder({ tasks: pass_double_task });
      setParsed_Columns(column_array);
    } else {
      //moving withing a column
      const column_array = [...parsed_columns];
      const column = parsed_columns[source.droppableId];
      const copied_tasks = [...column.col_tasks];
      const [removed] = copied_tasks.splice(source.index, 1);
      copied_tasks.splice(destination.index, 0, removed);
      copied_tasks.forEach((task, index) => (task.index = index));
      const pass_task = [...copied_tasks];
      column_array[source.droppableId].col_tasks = copied_tasks;
      editTaskOrder({ tasks: copied_tasks });
      setParsed_Columns(column_array);
    }
  }
};

const Tasks = () => {
  const userContext = useContext(UserContext);
  const [task_modal, setTask_Modal] = useState(false);
  const [column_modal, setColumn_Modal] = useState(false);
  const [column_index, setColumn_Index] = useState(0);
  const [task_index, setTask_Index] = useState(0);
  const [task_edit, setTask_edit] = useState(false);
  const [column_edit, setColumn_edit] = useState(false);
  const [selected_task, setSelected_task] = useState({});
  const [selected_column, setSelected_column] = useState({});
  const [no_columns, setNo_column] = useState(false);
  //const [parsed_columns, setParsed_Columns] = useState([]);
  const onDeleteModal_task = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setTask_Modal(true);
  };
  const onDeleteModal_column = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setColumn_Modal(true);
  };
  const onEditModal_column = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setColumn_edit(true);
  };
  const onEditModal_task = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setTask_edit(true);
  };
  const onModalClose = () => {
    setTask_Modal(false);
    return;
  };
  const onModalClose_column = () => {
    setColumn_Modal(false);
    return;
  };
  const onEditTaskClose = () => {
    setTask_edit(false);
    return;
  };
  const onEditColClose = () => {
    setColumn_edit(false);
    return;
  };
  const onManageEmptyClose = () => {
    setNo_column(false);
    return;
  };

  const deleteColumn = async (deletedColumn) => {
    const url = '/column';
    try {
      await httpService.del(url, { data: deletedColumn });
      toast.success('Successfully deleted column!');
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const deleteTask = async (deletedTask) => {
    const url = '/task';
    try {
      await httpService.del(url, { data: deletedTask });
      toast.success('Successfully deleted task!');
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const getColumnsByUserId = async () => {
    const url = `/column/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      getTasksByUserId(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
      setNo_column(true);
    }
  };

  const getTasksByUserId = async (fetchedColumns) => {
    const url = `/task/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      parseColumns(fetchedColumns, response.data);
    } catch (error) {
      parseColumns(fetchedColumns, []);
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  /** Fix if have time */
  // const parseTasks = (columns, tasks) => {
  //   const parsing_tasks = tasks.filter((desired_tasks) => columns === desired_tasks.col_id);
  //   for (let i = 0; i < tasks.length; i++) {
  //     const parsed_object = {
  //       id: tasks[i].id,
  //       user_id: tasks[i].user_id,
  //       col_id: tasks[i].col_id,
  //       index: i,
  //       start_date: tasks[i].start_date,
  //       end_date: tasks[i].end_date,
  //       title: tasks[i].title,
  //       notes: tasks[i].notes
  //     };
  //     parsing_tasks.push(parsed_object);
  //   }
  // };

  const parseColumns = (columns, tasks) => {
    const parsing_columns = [];
    for (let i = 0; i < columns.length; i++) {
      const parsed_object = {
        id: columns[i].id,
        title: columns[i].title,
        col_order: i,
        col_tasks: tasks.filter((desired_tasks) => columns[i].id === desired_tasks.col_id)
      };
      parsing_columns.push(parsed_object);
    }
    setParsed_Columns(parsing_columns);
  };

  useEffect(() => {
    getColumnsByUserId();
  }, []);

  const [parsed_columns, setParsed_Columns] = useState([]);
  //setParsed_Columns(parsing_columns);
  //onDragEnd(result, parsed_columns, setParsed_Columns)
  const onTaskDelete = (task, index) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    const copied_tasks = [...column.col_tasks];
    const [removed] = copied_tasks.splice(index, 1);
    copied_tasks.forEach((task, index) => (task.index = index));
    const Back_End_Bundle = {
      task_id: removed.id,
      list_of_tasks: copied_tasks
    };
    deleteTask(Back_End_Bundle);
    column_array[column_index].col_tasks = copied_tasks;
    setParsed_Columns(column_array); //send the taskid of the one thats deleted BACKEND
    setTask_Modal(false);
    return;
  };
  const onColumnDelete = (index) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    const list_of_tasks_length = column_array[index].col_tasks.length;
    column_array.splice(index, 1);
    column_array.forEach((col, index) => (col.col_order = index));
    const array_without_tasks = column_array.map(({ col_tasks, ...keptattr }) => keptattr);
    const Back_End_Bundle = {
      col_id: column.id,
      list_of_tasks_length: list_of_tasks_length,
      list_of_tasks: column.col_tasks,
      list_of_columns: array_without_tasks
    };
    deleteColumn(Back_End_Bundle);
    setParsed_Columns(column_array);
    setColumn_Modal(false);
    return;
  };

  const onTaskUpdate = (notes, title, start_date, end_date) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    const copied_tasks = [...column.col_tasks];
    copied_tasks[task_index].notes = notes;
    copied_tasks[task_index].title = title;
    copied_tasks[task_index].start_date = start_date;
    copied_tasks[task_index].end_date = end_date;
    setParsed_Columns(column_array);
    return;
  };

  const onColUpdate = (title) => {
    const column_array = [...parsed_columns];
    column_array[column_index].title = title;
    setParsed_Columns(column_array);
    return;
  };
  const heightOfScreen = window.screen.height - window.screen.height * 0.1;
  const widthOfScreen = window.screen.width;
  return (
    <Container
      fluid
      className="container-scrolling"
      style={{
        paddingTop: 50
      }}
    >
      <DragDropContext onDragEnd={(result) => onDragEnd(result, parsed_columns, setParsed_Columns)}>
        <ModalTaskEdit show={task_edit} handleClose={onEditTaskClose} task={selected_task} onTaskUpdate={onTaskUpdate} task_index={task_index} col_index={column_index} />
        <ModalTasks index={task_index} show={task_modal} task={parsed_columns} onModalClose={onModalClose} onTaskDelete={onTaskDelete} />
        <ManageEmpty show={no_columns} onModalClose={onManageEmptyClose} />
        <Droppable droppableId="all_columns" direction="horizontal" type="column">
          {(provided, snapshot) => {
            return (
              <Container fluid className="justify-content-left column-height" ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', flexDirection: 'row' }}>
                {parsed_columns.map((column, index) => {
                  return (
                    <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <Col md="auto" ref={provided.innerRef} {...provided.draggableProps}>
                            <ListGroup>
                              <ListGroupItem {...provided.dragHandleProps} style={{ margin: 5, justifyContent: 'center', background: 'black', color: 'white' }}>
                                {column.title}
                                <ModalColumns index={column_index} show={column_modal} task={column} onModalClose={onModalClose_column} onColumnDelete={onColumnDelete} />
                                <ModalColumnsEdit show={column_edit} handleClose={onEditColClose} column={selected_column} onColUpdate={onColUpdate} task_index={task_index} col_index={column_index} />
                                <Button
                                  style={{ display: 'inline-flex', float: 'right' }}
                                  variant="danger"
                                  onClick={(e) => {
                                    onDeleteModal_column(e);
                                    setColumn_Index(column.col_order);
                                  }}
                                >
                                  X
                                </Button>
                                <Button
                                  style={{ display: 'inline-flex', float: 'right' }}
                                  variant="outline-light"
                                  onClick={(e) => {
                                    onEditModal_column(e);
                                    setColumn_Index(column.col_order);
                                    setSelected_column(parsed_columns[column.col_order]);
                                  }}
                                >
                                  Edit{' '}
                                </Button>
                              </ListGroupItem>
                              <div style={{ margin: 8 }}>
                                <Droppable droppableId={column.col_order.toString()} type="task" key={column.col_order}>
                                  {(provided, snapshot) => {
                                    return (
                                      <ListGroup
                                        md="auto"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                          background: snapshot.isDraggingOver ? '#eed0fd' : 'lightgrey',
                                          minHeight: 50,
                                          minWidth: 300,
                                          className: 'task-height'
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
                                                      background: snapshot.isDragging ? '#110119' : '#300346',
                                                      color: 'white',
                                                      ...provided.draggableProps.style,
                                                      className: 'task-height'
                                                    }}
                                                  >
                                                    <Row>
                                                      <h2>
                                                        {task.title}{' '}
                                                        <Button
                                                          className="task-button-positioning"
                                                          variant="danger"
                                                          onClick={(e) => {
                                                            onDeleteModal_task(e);
                                                            setTask_Index(task.index);
                                                            setColumn_Index(column.col_order);
                                                          }}
                                                        >
                                                          X
                                                        </Button>
                                                        <Button
                                                          className="task-button-positioning"
                                                          variant="outline-light"
                                                          onClick={(e) => {
                                                            onEditModal_task(e);
                                                            setTask_Index(task.index);
                                                            setColumn_Index(column.col_order);
                                                            setSelected_task(parsed_columns[column.col_order].col_tasks[task.index]);
                                                          }}
                                                        >
                                                          Edit
                                                        </Button>
                                                      </h2>
                                                    </Row>
                                                    <Row>
                                                      <Col>{task.notes}</Col>
                                                    </Row>
                                                    <Row>
                                                      <Col>From: {task.start_date.slice(0, 10)}</Col>
                                                      <Col>To: {task.end_date.slice(0, 10)}</Col>
                                                    </Row>
                                                    <ListGroup style={{ display: 'inline-flex', float: 'right' }}></ListGroup>
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
                            </ListGroup>
                          </Col>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Container>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Tasks;
