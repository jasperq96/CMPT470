import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UserContext } from '../../hooks/UserContext';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { capitalize } from '../../utils/capitalizeString';
import './Tasks.css';
import ModalTasks from '../../components/ModalTasks';
import ModalColumns from '../../components/ModalColumns';
import ModalColumnsEdit from '../../components/ModalColumnsEdit';
import ModalTaskEdit from '../../components/ModalTaskEdit';

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
  //console.log('i am dragging');
  if (result.destination === null) {
    return;
  }
  const { source, destination, type } = result;
  //console.log('before i move columns');
  if (type === 'column') {
    const column_array = [...parsed_columns];
    //column_array
    const [removed] = column_array.splice(source.index, 1);
    // removed object is the column being moved
    column_array.splice(destination.index, 0, removed);
    //console.log('I am moving columns', column_array);
    column_array.forEach((col, index) => (col.col_order = index));
    const pass_backend = column_array.map(({ col_tasks, ...keptattr }) => keptattr);
    console.log('BACKEND what i pass when i move the columns', { columns: pass_backend }); //reformat this to pass column array normally Done BACKEND
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
      //console.log('this is the removed task', removed);
      removed.col_id = to_column.id;
      to_tasks.splice(destination.index, 0, removed);
      to_tasks.forEach((task, index) => (task.index = index));
      from_tasks.forEach((task, index) => (task.index = index));
      column_array[source.droppableId].col_tasks = from_tasks;
      column_array[destination.droppableId].col_tasks = to_tasks; // reformat this to pass both tasks lists in a single list make sure indeces arent fucked BACKEND
      const pass_double_task = [...from_tasks, ...to_tasks];
      console.log("BACKEND these are the tasks i'm passing to backend when you move between columns col_id and indeces change", { tasks: pass_double_task });
      editTaskOrder({ tasks: pass_double_task });
      setParsed_Columns(column_array);
      //console.log('i tried to move between columns', from_tasks, to_tasks);
    } else {
      //moving withing a column
      const column_array = [...parsed_columns];
      const column = parsed_columns[source.droppableId];
      const copied_tasks = [...column.col_tasks];
      const [removed] = copied_tasks.splice(source.index, 1);
      copied_tasks.splice(destination.index, 0, removed);
      copied_tasks.forEach((task, index) => (task.index = index));
      const pass_task = [...copied_tasks];
      console.log("BACKEND this is what i'm passing to back end when i change tasks within a column", { tasks: copied_tasks }); // reformat this to pass back single task list affected BACKEND
      column_array[source.droppableId].col_tasks = copied_tasks;
      editTaskOrder({ tasks: copied_tasks });
      setParsed_Columns(column_array);
      //console.log('after setting parsed columns', column_array);
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

  const getColumnsByUserId = async () => {
    const url = `/column/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      getTasksByUserId(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const getTasksByUserId = async (fetchedColumns) => {
    const url = `/task/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      parseColumns(fetchedColumns, response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const parseColumns = (columns, tasks) => {
    const parsing_columns = [];
    for (let i = 0; i < columns.length; i++) {
      const parsed_object = {
        id: columns[i].id,
        title: columns[i].title,
        col_order: columns[i].col_order,
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
  console.log(parsed_columns);
  //onDragEnd(result, parsed_columns, setParsed_Columns)
  const onTaskDelete = (task, index) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    const copied_tasks = [...column.col_tasks];
    console.log('these are the copied tasks', copied_tasks);
    const [removed] = copied_tasks.splice(index, 1);
    copied_tasks.forEach((task, index) => (task.index = index));
    const Back_End_Bundle = {
      task_id: removed.id,
      list_of_tasks: copied_tasks
    };
    console.log('BACKEND This is the bundle for when you delete tasks', Back_End_Bundle);
    column_array[column_index].col_tasks = copied_tasks;
    setParsed_Columns(column_array); //send the taskid of the one thats deleted BACKEND
    setTask_Modal(false);
    return;
  };
  const onColumnDelete = (index) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    column_array.splice(index, 1);
    column_array.forEach((col, index) => (col.col_order = index));
    const array_without_tasks = column_array.map(({ col_tasks, ...keptattr }) => keptattr);
    const Back_End_Bundle = {
      col_id: column.id,
      list_of_tasks: column.col_tasks,
      list_of_columns: array_without_tasks
    };
    console.log('BACKEND col_id, listoftasks and listofcolumns all bundled up', Back_End_Bundle);
    setParsed_Columns(column_array);
    setColumn_Modal(false);
    return;
  };

  const onTaskUpdate = (notes, title, start_date, end_date) => {
    const column_array = [...parsed_columns];
    const column = parsed_columns[column_index];
    const copied_tasks = [...column.col_tasks];
    //console.log('these are the copied tasks before update', copied_tasks);
    copied_tasks[task_index].notes = notes;
    copied_tasks[task_index].title = title;
    copied_tasks[task_index].start_date = start_date;
    copied_tasks[task_index].end_date = end_date;
    console.log('BACKEND this is the task after update', copied_tasks[task_index]);
    setParsed_Columns(column_array);
    return;
  };

  const onColUpdate = (title) => {
    const column_array = [...parsed_columns];
    //console.log('before title update', column_array[column_index].title);
    column_array[column_index].title = title;
    const pass_backend = column_array.map(({ col_tasks, ...keptattr }) => keptattr);
    console.log('BACKEND this is the column with title change', pass_backend[column_index]);
    setParsed_Columns(column_array);
    console.log(parsed_columns);
    return;
  };
  return (
    <Container fluid style={{ paddingTop: 50 }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, parsed_columns, setParsed_Columns)}>
        {
          //console.log('before the mapping', parsed_columns)
        }
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
                            <ListGroup>
                              <ListGroupItem {...provided.dragHandleProps} style={{ margin: 5, justifyContent: 'center' }}>
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
                                  variant="dark"
                                  onClick={(e) => {
                                    onEditModal_column(e);
                                    console.log('this is the column order', column_index);
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
                                                      <ModalTasks index={task_index} show={task_modal} task={parsed_columns} onModalClose={onModalClose} onTaskDelete={onTaskDelete} />
                                                      <ModalTaskEdit
                                                        show={task_edit}
                                                        handleClose={onEditTaskClose}
                                                        task={selected_task}
                                                        onTaskUpdate={onTaskUpdate}
                                                        task_index={task_index}
                                                        col_index={column_index}
                                                      />
                                                      <Button
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
                                                        variant="dark"
                                                        onClick={(e) => {
                                                          onEditModal_task(e);
                                                          setTask_Index(task.index);
                                                          setColumn_Index(column.col_order);
                                                          console.log('this is the column order', column.col_order);
                                                          console.log('this is the task order', task.index);
                                                          console.log('this is the selected task', parsed_columns[column.col_order].col_tasks[task.index]);
                                                          setSelected_task(parsed_columns[column.col_order].col_tasks[task.index]);
                                                          console.log('this is the selected task state', selected_task);
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
                            </ListGroup>
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
};

export default Tasks;
