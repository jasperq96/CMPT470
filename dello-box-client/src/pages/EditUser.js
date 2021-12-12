import React, { useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
export default function EditUser() {
  const [data, setData] = useState();
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
      </Form>
    </Container>
  );
}
