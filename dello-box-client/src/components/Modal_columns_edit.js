import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
export default function Modal_columns_edit(props) {
  const [values, setValue] = useState({
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
    alert(`submitted values are ${values.title}`);
    props.onColUpdate(values.title);
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Editing a column {props.task_index}
          {props.col_index}
        </Modal.Title>
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
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
