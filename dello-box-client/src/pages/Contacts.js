import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../hooks/UserContext';
import httpService from '../services/httpService';
import '../stylesheets/contacts.css'

export default function Contacts() {

  const userContext = useContext(UserContext);

  const [departmentState, setDepartmentState] = useState({
    departments: []
  });

  useEffect(() => {
    getDepartments();
  }, [setDepartmentState]);

  
  const getDepartments = async () => {
    const url = '/contacts/' + userContext.user?.id;
    console.log("url:" + url)
    try {
      console.log("Getting contacts...")
      const response = await httpService.get(url);
      const { data } = response;
      console.log("data: " + data);
      setDepartmentState({
        departments: data
        }
      );
    } catch (error) {
      console.log('Error: Unable to fetch from ' + url);
    }
  };

  console.log("cool:" + departmentState.departments[0])

  return (
    <div>
      <h1>Contacts List</h1>
      <div>-
      {departmentState.departments.map((department) => {
            return (
              <div className="contact-card">
                  <p className="p-title">{department.first_name} {department.last_name} ({department.nickname})</p>
                  <p className="p-email">{department.email}</p>
                  <p className="p-phone">{department.phone}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
