import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'

export default function Contacts() {

  const userContext = useContext(UserContext);

  const [contactState, setContactState] = useState({
    contacts: []
  });

  useEffect(() => {
    getContacts();
  }, [setContactState]);


  const getContacts = async () => {
    const url = '/user-info' + userContext.user?.id;
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
      <h1>Add Contact</h1>
      <div>
        {contactState.contacts.map((contact) => {
          return (
            <div className="contact-card">
              <p className="p-title">{contact.first_name} {contact.last_name}</p>
              <p className="p-email">{contact.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
