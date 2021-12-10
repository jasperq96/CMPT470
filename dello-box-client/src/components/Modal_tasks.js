import React, { useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button, Modal, Form } from 'react-bootstrap';
import Tasks from '../pages/TaskPages/Tasks';

export default function Modal_tasks(props) {
  return (
    // <h1>
    //   {props.index.toString()}
    //   {props.show.toString()}
    //   {props.task.title}
    //   {console.log(props)}
    // onModalClose
    // </h1>

    <Modal show={props.show}>
      <Modal.Header closeButton onHide={() => props.onModalClose()}>
        <Modal.Title>Are you Sure you want to delete this task</Modal.Title>
      </Modal.Header>
      {console.log(props.task, props.task_modal, props.parsed_columns)}
      <Modal.Body>
        <h3>{props.index}</h3>

        {props.task.notes}
      </Modal.Body>
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
