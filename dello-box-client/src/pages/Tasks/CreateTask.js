import React, { useContext, useState, useEffect } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import { capitalize } from '../../utils/capitalizeString';
import { UserContext } from '../../hooks/UserContext';

export default function CreateTask() {
  const userContext = useContext(UserContext);
  const [cols, setCols] = useState([]);
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
      startDate: newStartDate.slice(0, 19),
      endDate: newEndDate.slice(0, 19),
      title: parsing_Object.title,
      notes: parsing_Object.notes
    };

    console.log(forBackend);
    const url = `/task/${userContext.user?.id}`;
    createTaskOrColumn(url, forBackend);
    setValue({
      title: '',
      notes: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      col_id: ''
    });
    console.log(values);
  };

  const handleSubmitCol = (evt) => {
    if (colValue.title !== '') {
      evt.preventDefault();
      const forBackend = {
        title: colValue.title
      };
      const url = `/column/${userContext.user?.id}`;
      createTaskOrColumn(url, forBackend);
      window.location.reload();
    } else {
      toast.error('Title: Must have a length of at least 1 character');
    }
    setColValue({
      title: ''
    });
  };

  const createTaskOrColumn = async (url, formData) => {
    try {
      await httpService.post(url, formData);
      toast.success('Successfully created a Task/Column!');
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const getCols = async () => {
    const url = `/column/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      setCols(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  useEffect(() => {
    getCols();
  }, []);

  return (
    <Container fluid>
      <h1 className="WhiteHeaders">Creating a Task</h1>
      <Form>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Task Title</Form.Label>
          <Form.Control type="Text" placeholder="Task Title" name="title" value={values.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Task Notes</Form.Label>
          <Form.Control type="Text" placeholder="Task Notes" as="textarea" rows={3} name="notes" value={values.notes} onChange={handleChange} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">Start Date</Form.Label>
            <Form.Control type="Date" placeholder="First Day of The Task" name="start_date" value={values.start_date} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Time of Event</Form.Label>
            <Form.Control type="Time" placeholder="Time of Event" name="start_time" value={values.start_time} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">End Date</Form.Label>
            <Form.Control type="Date" placeholder="Last Day of The Task" name="end_date" value={values.end_date} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Time of Event End</Form.Label>
            <Form.Control type="Time" placeholder="Time of Event End" name="end_time" value={values.end_time} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label className="WhiteHeaders">Column</Form.Label>
          <Form.Select defaultValue="Choose..." name="col_id" onChange={handleChange}>
            {cols.map((col) => (
              <option value={col.id} key={col.id}>
                {col.title}
              </option>
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
