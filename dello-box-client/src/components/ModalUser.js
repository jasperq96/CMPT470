import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalUser = (props) => {
  return (
    <Modal show={props.show} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>WARNING</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => props.onModalClose()}>
          Woops
        </Button>
        <Button variant="danger" onClick={() => props.onModalDelete()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUser;
