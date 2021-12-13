import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { editColumnTitleObject } from '../models/columnModel';
import { capitalize } from '../utils/capitalizeString';

const ModalColumnsEdit = (props) => {
  const [values, setValue] = useState({
    title: ''
  });

  const editColumnTitleById = async (columnId, editedColumnTitle) => {
    const url = `/column/title/${columnId}`;
    try {
      await httpService.put(url, editedColumnTitle);
      toast.success('Successfully edited column title!');
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
    const isSuccessful = await editColumnTitleById(props.column.id, editColumnTitleObject(values));
    if (isSuccessful) {
      props.onColUpdate(values.title);
      props.handleClose();
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editing a column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-5" controlId="formBasicUsername">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder={props.column.title} name="title" value={values.title} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Close
        </Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalColumnsEdit;
