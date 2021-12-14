import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css';
import { capitalize } from '../utils/capitalizeString';
import { Form, ListGroupItem } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Table, Container, Button, Row, Col, ListGroup } from 'react-bootstrap';

const Contacts = () => {
  const userContext = useContext(UserContext);
  const [contactState, setContactState] = useState({
    contacts: []
  });

  const [queryContactState, setQueryContactState] = useState({
    queryContacts: []
  });

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
      toast.error('Error: No contacts found!');
    }
  };

  const searchContact = async () => {
    const url = `/contacts/filter/${userContext.user?.id}/${document.getElementById('search-bar').value}`;
    try {
      const response = await httpService.get(url);
      const { data } = response;
      if (data.length === 0) {
        toast.error('No users found!');
        setQueryContactState({
          queryContacts: []
        });
      } else {
        setQueryContactState({
          queryContacts: data
        });
      }
    } catch (error) {
      toast.error('No users found!');
      setQueryContactState({
        queryContacts: []
      });
    }
  };

  const addContact = async (contactId) => {
    const url = `/contacts/${userContext.user?.id}/add`;
    try {
      await httpService.put(url, { contactId: contactId });
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
    await getContacts();
    await searchContact();
  };

  const removeContact = async (contactId) => {
    const url = `/contacts/${userContext.user?.id}`;
    try {
      await httpService.del(url, { data: { contactId: contactId } });
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
    await getContacts();
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
                <th>Add Contact (Case Sensitive)</th>
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
};

export default Contacts;
