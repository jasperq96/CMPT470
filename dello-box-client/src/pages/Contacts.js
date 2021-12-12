import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Contacts() {

  const userContext = useContext(UserContext);
  const history = useHistory();

  const [contactState, setContactState] = useState({
    contacts: []
  });

  const [queryContactState, setQueryContactState] = useState({
    queryContacts: []
  });

  const routeChange = () =>{

    let path = `/contacts/add`;
    history.push(path);
  }

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
        }
      );
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
      const response = await httpService.get(url, {"contactId": "user"});
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
  }

  const addContact = async (id) => {
    const url = `/contacts/${userContext.user?.id}/add`;

    try {
      const response = await httpService.put(url, {"contactId":id});
      const { data } = response;
    } catch (error) {
      console.log(error);
    }

    await getContacts();

    return undefined;
  }

  const removeContact = async (id) => {

    const url = `/contacts/${userContext.user?.id}/add`;

    try {
      const response = await httpService.delete(url, {"contactId":id});
      const { data } = response;
    } catch (error) {
      console.log(error);
    }

    await getContacts();

    return undefined;
  }


  return (

    <table>
      <tr>
        <td>
          <h1>Contacts List</h1>
          {contactState.contacts.map((contact) => {
            return (
              <div className="contact-card">
                <p className="p-title">{contact.first_name} {contact.last_name} ({contact.nickname})</p>
                <p className="p-email">{contact.email}</p>
                <p className="p-phone">{contact.phone}</p>
                <button onClick={() => removeContact(contact.user_id)}>Remove from contacts</button>
              </div>
            );
          })}
        </td>
        <td>
          <h1>Add Contact</h1>
          <Form.Group className="mb-3" controlId="formSearch">
            <Form.Control id="search-bar" type="search" placeholder="Search friend's username..." ></Form.Control>
          </Form.Group>
          <button onClick={searchContact}>Search</button>
          {queryContactState.queryContacts.map((contact) => {
            return (
              <div className="contact-card">
                <p className="p-title">{contact.first_name} {contact.last_name} ({contact.nickname})</p>
                <p className="p-email">{contact.email}</p>
                <p className="p-phone">{contact.phone}</p>
                <button onClick={() => addContact(contact.user_id)}>Add to Contacts</button>
              </div>
            );
          })}
        </td>
      </tr>

      <div>


      </div>
    </table>
  );
}
