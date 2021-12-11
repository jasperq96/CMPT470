import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button, Modal, Form } from 'react-bootstrap';

export default function Modal_tasks(props) {
  return (
    // <h1>
    //   {props.index.toString()}
    //   {props.show.toString()}
    //   {props.task.title}
    //   {console.log(props)}
    // onModalClose
    // </h1>

    <Modal show={props.show} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>WARNING</Modal.Title>
      </Modal.Header>
      {console.log(props.column, props.task_modal, props.parsed_columns)}
      <Modal.Body>Are you Sure you want to delete this task</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => props.onModalClose()}>
          Woops
        </Button>
        <Button variant="danger" onClick={() => props.onTaskDelete(props.task, props.index)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
