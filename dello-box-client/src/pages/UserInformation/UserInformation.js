import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../hooks/UserContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import initialUserInformation from './initialUserInformation.json';
import { capitalize } from '../../utils/capitalizeString';
import ModalUser from '../../components/ModalUser';
import { editUserInfoObject } from '../../models/userInfoModel';

const UserInformation = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const [values, setValue] = useState(initialUserInformation);
  const [userModal, setUserModal] = useState(false);

  const putUserInfo = async (evt) => {
    evt.preventDefault();
    try {
      await httpService.put(`/user-info/${userContext.user?.id}`, editUserInfoObject(values));
      toast.success('Successfully editted user information!');
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await httpService.get(`/user-info/${userContext.user?.id}`);
      setValue(response.data);
    } catch (error) {
      // Will display the first input error message
      const errorBody = error.response.data.errors[0];
      toast.error(capitalize(errorBody.param).concat(': ').concat(errorBody.msg));
    }
  };

  const deleteUser = async () => {
    const url = `/user/${userContext.user?.id}`;
    try {
      await httpService.del(url);
      toast.success('Successfully deleted account!');
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const onDeleteUser = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setUserModal(true);
  };

  const onModalClose = () => {
    setUserModal(false);
  };

  const onModalDelete = async () => {
    await userContext.logout();
    await deleteUser();
    history.push('/');
    setUserModal(false);
  };

  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container fluid>
      <h1 className="WhiteHeaders">Edit User Information</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">First Name</Form.Label>
            <Form.Control type="Name" placeholder="First Name" name="first_name" value={values.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Last Name</Form.Label>
            <Form.Control type="Name" placeholder="Last Name" name="last_name" value={values.last_name} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Email</Form.Label>
          <Form.Control type="Email" placeholder="Email" name="email" value={values.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Phone</Form.Label>
          <Form.Control type="PhoneNumber" placeholder="Phone Number" name="phone" value={values.phone} onChange={handleChange} />
        </Form.Group>
        <Button onClick={(e) => putUserInfo(e)}>Update User Information</Button>
        <ModalUser show={userModal} onModalClose={onModalClose} onModalDelete={onModalDelete}></ModalUser>
        <Button
          variant="danger"
          onClick={(e) => {
            onDeleteUser(e);
          }}
        >
          Delete Account
        </Button>
      </Form>
    </Container>
  );
};

export default UserInformation;
