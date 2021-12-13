import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalTasks = (props) => {
  return (
    <Modal show={props.show} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>WARNING</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
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
};

export default ModalTasks;
