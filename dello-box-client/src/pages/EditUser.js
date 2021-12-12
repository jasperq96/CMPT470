import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import httpService from '../services/httpService';
import { capitalize } from '../utils/capitalizeString';
import { UserContext } from '../hooks/UserContext';

const dummy_data = {
  user_id: 1,
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'janedoe@gmail.com',
  phone: '604-123-4567'
};

export default function EditUser() {
  const userContext = useContext(UserContext);
  const [info, setInfo] = useState([]);
  const [values, setValue] = useState({
    user_id: 1,
    first_name: dummy_data.first_name,
    last_name: dummy_data.last_name,
    email: dummy_data.email,
    phone: dummy_data.phone
  });

  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
      console.log(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const forBackend = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      phone: values.phone,
    }
    try{
      await httpService.put(`/user-info/${userContext.user?.id}`, forBackend);
      toast.success('Successfully editted User Info');
    }catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const updateInfo = async () =>{
    try{
      const updated_info = await httpService.get(`/user-info/${userContext.user?.id}`)
      setValue(updated_info.data);
    }catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  }

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <Container fluid>
      <h1 className="WhiteHeaders">Edit User Information</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">First Name</Form.Label>
            <Form.Control type="Name" placeholder="First Day of The Task" name="first_name" value={values.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Last Name</Form.Label>
            <Form.Control type="Name" placeholder="Time of Event" name="last_name" value={values.last_name} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Email</Form.Label>
          <Form.Control type="Email" placeholder="Task Title" name="email" value={values.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Phone</Form.Label>
          <Form.Control type="PhoneNumber" placeholder="Task Notes" name="phone" value={values.phone} onChange={handleChange} />
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)}>Change user Info</Button>
      </Form>
    </Container>
  );
}
