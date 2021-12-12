import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'
import { useHistory } from "react-router-dom";

export default function Contacts() {

  const userContext = useContext(UserContext);
  const history = useHistory();

  const [contactState, setContactState] = useState({
    contacts: []
  });

  const routeChange = () =>{
    let path = `/contacts/add`;
    history.push(path);
  }

  useEffect(() => {
    getContacts();
  }, [setContactState]);

  
  const getContacts = async () => {
    const url = '/contacts/' + userContext.user?.id;
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

  console.log("cool:" + contactState.contacts[0])

  return (
    <div>
      <h1>Contacts List</h1>
      <div>
      {contactState.contacts.map((contact) => {
            return (
              <div className="contact-card">
                  <p className="p-title">{contact.first_name} {contact.last_name} ({contact.nickname})</p>
                  <p className="p-email">{contact.email}</p>
                  <p className="p-phone">{contact.phone}</p>
              </div>
            );
          })}
        <button onClick={routeChange}>Add Contact</button>
      </div>
    </div>
  );
}
