import '../../App.css';
import React, { useContext, useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { capitalize } from '../../utils/capitalizeString';
import ViewFileElement from '../../components/ViewFile';

const ViewFiles = () => {
  const userContext = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const ALL_FILES = `${userContext.user?.id}/all`;
  const PUBLIC_FILES = 'public';
  const PRIVATE_FILES = `${userContext.user?.id}/private`;

  const getFiles = async (endpoint) => {
    const url = `/file-list/${endpoint}`;
    try {
      const response = await httpService.get(url);
      setFiles(response.data);
    } catch (error) {
      setFiles([]);
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const filterFiles = (filterIndicator) => {
    switch (filterIndicator) {
      case 1:
        getFiles(ALL_FILES);
        break;
      case 2:
        getFiles(PUBLIC_FILES);
        break;
      case 3:
        getFiles(PRIVATE_FILES);
        break;
      default:
        toast.error('Error: Not a valid button type!');
    }
  };

  useEffect(() => {
    getFiles(ALL_FILES);
  }, []);

  return (
    <React.Fragment>
      <div className="body-color">
        <h1>View Files</h1>
        <ButtonGroup className="button-padding">
          <Button onClick={() => filterFiles(1)} variant="secondary">
            All Files
          </Button>
          <Button onClick={() => filterFiles(2)} variant="secondary">
            Public Files
          </Button>
          <Button onClick={() => filterFiles(3)} variant="secondary">
            Your Files
          </Button>
        </ButtonGroup>
        <div className="file-container">
          <table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Date Created</th>
                <th>Mimetype</th>
                <th>Size (Bytes)</th>
              </tr>
            </thead>
            {files.map((file, index) => (
              <ViewFileElement id={index} fileData={file} />
            ))}
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewFiles;
