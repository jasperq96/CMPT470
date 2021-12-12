import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'
import { useHistory } from "react-router-dom";

export default function AddContact() {

  const userContext = useContext(UserContext);
  const history = useHistory();

  const [userState, setUserState] = useState({
    users: []
  });

  useEffect(() => {
    getUsers();
  }, [setUserState]);


  const getUsers = async () => {
    const url = '/user-info';
    console.log("GET users url:" + url)
    try {
      const response = await httpService.get(url);
      const { data } = response;
      console.log("data: " + data);
      setUserState({
          users: data
        }
      );
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  const addContact = async (id) => {

    const url = "/contacts/" + userContext.user?.id + "/add";

    try {
      const response = await httpService.put(url, {"contactId":id});
      const { data } = response;
      console.log("put response: " + data);
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
    }

    let path = `/contacts`;
    history.push(path);

    return undefined;
  }

  return (
    <div>
      <h1>Add Contact</h1>
      <div>
        {userState.users.map((user) => {
          return (
            <div className="contact-card">
              <p className="p-title">{user.first_name} {user.last_name}</p>
              <p className="p-email">{user.email}</p>
              <button onClick={() => addContact(user.id)}>Add to Contacts</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
