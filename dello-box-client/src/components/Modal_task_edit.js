import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Modal_task_edit(props) {
  const [task_values, setTask_Values] = useState({});
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a Task!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.handleClose()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
