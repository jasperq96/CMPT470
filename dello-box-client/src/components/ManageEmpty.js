import React from 'react';
import { Modal, Button } from 'react-bootstrap';
export default function ManageEmpty(props) {
  return (
    <Modal show={props.show} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>WARNING</Modal.Title>
      </Modal.Header>
      <Modal.Body>You do not have a Task or a Column Please make one under the Create a Task/Column option in the Navigation Bar</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.onModalClose()}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
