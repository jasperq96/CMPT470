import '../../App.css';
import React, { useContext, useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { capitalize } from '../../utils/capitalizeString';
import ViewFileElement from '../../components/ViewFile';
import { Container, Table, ToggleButton } from 'react-bootstrap';
import '../../stylesheets/files.css';
const ViewFiles = () => {
  const userContext = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const ALL_FILES = `${userContext.user?.id}/all`;
  const PUBLIC_FILES = 'public';
  const PRIVATE_FILES = `${userContext.user?.id}/private`;
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedYours, setCheckedYours] = useState(false);
  const [checkedPublic, setCheckedPublic] = useState(false);
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
    <Container className="container-create-view-scrolling">
      <React.Fragment>
        <Container>
          <div className="body-color files-navbar-margin">
            <h1>View Files</h1>
            <ButtonGroup className="button-padding">
              <ToggleButton
                onClick={() => {
                  filterFiles(1);
                  setCheckedAll(true);
                  setCheckedYours(false);
                  setCheckedPublic(false);
                }}
                variant="outline-light"
                id="toggle-check"
                type="checkbox"
                checked={checkedAll}
              >
                All Files
              </ToggleButton>
              <ToggleButton
                onClick={() => {
                  filterFiles(2);
                  setCheckedPublic(true);
                  setCheckedYours(false);
                  setCheckedAll(false);
                }}
                variant="outline-light"
                id="toggle-check"
                type="checkbox"
                checked={checkedPublic}
              >
                Public Files
              </ToggleButton>
              <ToggleButton
                onClick={() => {
                  filterFiles(3);
                  setCheckedPublic(false);
                  setCheckedYours(true);
                  setCheckedAll(false);
                }}
                variant="outline-light"
                id="toggle-check"
                type="checkbox"
                checked={checkedYours}
              >
                Your Files
              </ToggleButton>
            </ButtonGroup>
            <div className="file-container">
              <Table responsive variant="dark">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th className="responsive-cut">Date Created</th>
                    <th>Mimetype</th>
                    <th className="responsive-cut">Size (Bytes)</th>
                  </tr>
                </thead>
                {files.map((file, index) => (
                  <ViewFileElement id={index} fileData={file} />
                ))}
              </Table>
            </div>
          </div>
        </Container>
      </React.Fragment>
    </Container>
  );
};

export default ViewFiles;
