import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';

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
    console.log("url:" + url)
    try {
      console.log("Getting contacts...")
      const response = await httpService.get(url);
      const { data } = response;
      console.log("data: " + data);
      setContactState({
        contacts: data
        }
      );
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const searchContact = async (id) => {

    const url = `/contacts/${userContext.user?.id}/filter`;

    try {
      const response = await httpService.get(url, {"contactId": "user"});
      const { data } = response;
      console.log("put response: " + data);
      setQueryContactState({
        queryContacts: data
      });
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
    }

    let path = `/contacts`;
    history.push(path);

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
              </div>
            );
          })}
        </td>
        <td>
          <h1>Add Contact</h1>
          <Form.Group className="mb-3" controlId="formSearch">
            <Form.Control id="search-bar" type="search" placeholder="Search contacts..." ></Form.Control>
          </Form.Group>
          <button onClick={searchContact}>Search</button>
          {queryContactState.queryContacts.map((contact) => {
            return (
              <div className="contact-card">
                <p className="p-title">{contact.first_name} {contact.last_name} ({contact.nickname})</p>
                <p className="p-email">{contact.email}</p>
                <p className="p-phone">{contact.phone}</p>
                <button>Add contact</button>
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
