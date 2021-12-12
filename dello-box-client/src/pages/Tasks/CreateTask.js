import React, { useState } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
const dummy_data = [
  {
    id: '20',
    title: 'Second column',
    col_order: 0
  },
  {
    id: '21',
    title: 'Third column',
    col_order: 1
  },
  {
    id: '22',
    title: 'Fourth column',
    col_order: 2
  },
  {
    id: '23',
    title: 'first column',
    col_order: 3
  }
];
export default function CreateTask() {
  const [data, setData] = useState(dummy_data);
  const [values, setValue] = useState({
    title: '',
    notes: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    col_id: ''
  });
  const [colValue, setColValue] = useState({
    title: ''
  });
  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
    {
      console.log(evt.target.value);
    }
  };
  const handleChangeCol = (evt) => {
    setColValue({
      ...colValue,
      [evt.target.name]: evt.target.value
    });
    {
      console.log(evt.target.value);
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const parsing_Object = { ...values };
    console.log(parsing_Object);
    const comb_start = parsing_Object.start_date.concat(' ', parsing_Object.start_time);
    const comb_end = parsing_Object.end_date.concat(' ', parsing_Object.end_time);
    if (parsing_Object.start_date === '') {
      toast.error('You didnt set a Start Date');
      return;
    }
    if (parsing_Object.end_date === '') {
      toast.error('You didnt set a End Date');
      return;
    }
    const newStartDate = new Date(comb_start).toISOString();
    const newEndDate = new Date(comb_end).toISOString();
    const forBackend = {
      colId: parsing_Object.col_id,
      startDate: newStartDate,
      endDate: newEndDate,
      title: parsing_Object.title,
      notes: parsing_Object.notes
    };
    console.log('This is for', forBackend);
  };
  const handleSubmitCol = (evt) => {
    evt.preventDefault();
    const forBackend = {
      title: colValue.title
    };
    console.log('This is for Backend', forBackend);
    // if (new Date(comb_start) !== null) {
    //   const newStartDate = new Date(comb_start).toISOString();
    //   console.log(newStartDate);
    // }
    //console.log(new Date(comb_Start));
    //console.log(comb_Start);
    //console.log(comb_Start.toISOString());
  };
  //   Task:
  //   {
  //     id: 3,
  //     user_id: 1,
  //     col_id: 20,
  //     index: 0,
  //     start_date: '2021-11-14T10:30:00.000Z',
  //     end_date: '2021-11-18T16:30:00.000Z',
  //     title: 'task1',
  //     notes: 'Some notes here'
  //   }

  // Column:
  //   {
  //     id: 20,
  //     title: 'first column',
  //     col_order: 0
  //   },
  //<Form.Control type="Username" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} />
  return (
    <Container fluid>
      <h1 className="WhiteHeaders">Creating a Task</h1>
      <Form>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Task Title</Form.Label>
          <Form.Control type="Text" placeholder="Task Title" name="title" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Task Notes</Form.Label>
          <Form.Control type="Text" placeholder="Task Notes" as="textarea" rows={3} name="notes" onChange={handleChange} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">Start Date</Form.Label>
            <Form.Control type="Date" placeholder="First Day of The Task" name="start_date" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Time of Event</Form.Label>
            <Form.Control type="Time" placeholder="Time of Event" name="start_time" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">End Date</Form.Label>
            <Form.Control type="Date" placeholder="First Day of The Task" name="end_date" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Time of Event End</Form.Label>
            <Form.Control type="Time" placeholder="Time of Event" name="end_time" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label className="WhiteHeaders">Column</Form.Label>
          <Form.Select defaultValue="Choose..." name="col_id" onChange={handleChange}>
            {data.map((col) => (
              <option value={col.id}>{col.title} </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)}>Submit Task</Button>
      </Form>
      <h1 className="WhiteHeaders">Creating a Column</h1>
      <Form>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Column Title</Form.Label>
          <Form.Control type="Text" placeholder="Column Title" name="title" onChange={handleChangeCol} />
        </Form.Group>
        <Button onClick={(e) => handleSubmitCol(e)}>Submit Column</Button>
      </Form>
    </Container>
  );
}
