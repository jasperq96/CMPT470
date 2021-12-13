import React, { useContext, useState } from 'react';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { useHistory } from 'react-router-dom';
import { capitalize } from '../../utils/capitalizeString';
import { Button, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../stylesheets/files.css';
const UploadFiles = () => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const [uploadedFile, setUploadedFileState] = useState('');

  const validateFileExtension = (event) => {
    setUploadedFileState(event.target.files[0]);
  };

  const uploadFile = async (url, formData, configureContentType) => {
    try {
      await httpService.post(url, formData, configureContentType);
      toast.success('Successfully uploaded a file!');
      history.push('/files/view');
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const uploadFileValidator = () => {
    if (uploadedFile.length < 1) {
      toast.error(`Error: No file selected!`);
      return;
    }
    const url = `/file/${userContext.user?.id}`;
    const formData = new FormData();
    formData.append('file', uploadedFile);
    const configureContentType = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    uploadFile(url, formData, configureContentType);
  };

  return (
    <Container className="body-color files-navbar-margin">
      <h1>Upload Files</h1>
      <Form.Group>
        <Form.Label>File</Form.Label>
        <Form.Control type="file" name="file" id="file" onChange={validateFileExtension} size="lg" />
      </Form.Group>
      <OverlayTrigger
        key={'OverlayTrigger'}
        placement="bottom"
        overlay={
          <Tooltip id={'FileType'}>
            The file types that we accept are the following.
            <br />
            pdf, png, jpeg/jpg, docx/doc, pptx, csv, .txt, .zip
          </Tooltip>
        }
      >
        <Button className="file-button-padding" variant="outline-light" onClick={uploadFileValidator}>
          Upload File
        </Button>
      </OverlayTrigger>
    </Container>
  );
};

export default UploadFiles;
