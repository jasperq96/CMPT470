import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css';
import { useHistory } from 'react-router-dom';
import { Form, ListGroupItem } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Table, Container, Button, Row, Col, ListGroup } from 'react-bootstrap';

export default function Contacts() {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [contactState, setContactState] = useState({
    contacts: []
  });

  const [queryContactState, setQueryContactState] = useState({
    queryContacts: []
  });

  const routeChange = () => {
    let path = `/contacts/add`;
    history.push(path);
  };

  useEffect(() => {
    getContacts();
  }, [setContactState]);

  const getContacts = async () => {
    const url = `/contacts/${userContext.user?.id}`;
    try {
      const response = await httpService.get(url);
      const { data } = response;
      setContactState({
        contacts: data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchContact = async () => {
    if (document.getElementById('search-bar').value.length < 4) {
      toast.error(`Please enter a minimum of 4 characters!`);
      setQueryContactState({
        queryContacts: []
      });
      return;
    }
    toast.dismiss();

    const url = `/contacts/filter/${userContext.user?.id}/${document.getElementById('search-bar').value}`;

    try {
      const response = await httpService.get(url, { contactId: 'user' });
      const { data } = response;
      setQueryContactState({
        queryContacts: data
      });
    } catch (error) {
      console.log(error);
    }

    let path = `/contacts`;
    history.push(path);

    return undefined;
  };

  const addContact = async (id) => {
    const url = `/contacts/${userContext.user?.id}/add`;

    try {
      const response = await httpService.put(url, { contactId: id });
      const { data } = response;
    } catch (error) {
      console.log(error);
    }

    await getContacts();

    return undefined;
  };

  const removeContact = async (id) => {
    const url = `/contacts/${userContext.user?.id}`;
    console.log('del:' + url);
    console.log('id:' + id);

    try {
      const response = await httpService.del(url, { data: { contactId: id } });
      const { data } = response;
    } catch (error) {
      console.log(error);
    }

    await getContacts();

    return undefined;
  };

  return (
    <Container className="p-title">
      <Row>
        <Col>
          <Table variant="dark">
            <thead>
              <tr>
                <th>Contacts List</th>
              </tr>
            </thead>
            {contactState.contacts.map((contact) => {
              return (
                <ListGroup className="p-contacts">
                  <ListGroupItem>
                    {contact.first_name} {contact.last_name} {contact.nickname}
                  </ListGroupItem>
                  <ListGroupItem>{contact.email}</ListGroupItem>
                  <ListGroupItem>{contact.phone}</ListGroupItem>
                  <Button variant="outline-light" onClick={() => removeContact(contact.user_id)}>
                    Remove from contacts
                  </Button>
                </ListGroup>
              );
            })}
          </Table>
        </Col>
        <Col>
          <Table variant="dark">
            <thead>
              <tr>
                <th>Add Contact</th>
              </tr>
            </thead>
            <Form.Group className="mb-3" controlId="formSearch">
              <Form.Control id="search-bar" type="search" placeholder="Search friend's username..."></Form.Control>
            </Form.Group>
            <Button variant="outline-light" onClick={searchContact}>
              Search
            </Button>
            {queryContactState.queryContacts.map((contact) => {
              return (
                <ListGroup className="p-contacts">
                  <ListGroupItem>
                    {contact.first_name} {contact.last_name} {contact.nickname}
                  </ListGroupItem>
                  <ListGroupItem>{contact.email}</ListGroupItem>
                  <Button variant="outline-light" onClick={() => addContact(contact.user_id)}>
                    Add to Contacts
                  </Button>
                </ListGroup>
              );
            })}
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
