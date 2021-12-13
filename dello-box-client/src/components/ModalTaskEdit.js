import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { editTaskFieldsObject } from '../models/taskModel';
import { capitalize } from '../utils/capitalizeString';

const ModalTaskEdit = (props) => {
  const [values, setValue] = useState({
    title: '',
    start_date: '',
    end_date: '',
    notes: ''
  });

  const editTaskFieldsById = async (taskId, editedTaskFields) => {
    const url = `/task/fields/${taskId}`;
    try {
      await httpService.put(url, editedTaskFields);
      toast.success('Successfully edited task fields!');
      return true;
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
      return false;
    }
  };

  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const isSuccessful = await editTaskFieldsById(props.task.id, editTaskFieldsObject(values));
    if (isSuccessful) {
      props.onTaskUpdate(values.notes, values.title, values.start_date, values.end_date);
      props.handleClose();
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editing a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-5" controlId="formBasicUsername">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder={props.task.title} name="title" value={values.title} onChange={handleChange} />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicFirstName">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type={Date} placeholder={props.task.start_date} name="start_date" value={values.start_date} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicLastName">
              <Form.Label>End Date</Form.Label>
              <Form.Control type={Date} placeholder={props.task.end_date} name="end_date" value={values.end_date} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="Notes" placeholder={props.task.notes} name="notes" value={values.notes} onChange={handleChange} as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Close
        </Button>

        <Button
          variant="primary"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTaskEdit;
