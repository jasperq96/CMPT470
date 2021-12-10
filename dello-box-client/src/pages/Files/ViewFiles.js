import '../../App.css';
import React, { useContext, useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { capitalize } from '../../utils/capitalizeString';
import ViewFileElement from '../../components/ViewFile';

const ViewFiles = () => {
  const userContext = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const url = `/file-list/${userContext.user?.id}/all`;
    try {
      const response = await httpService.get(url);
      setFiles(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <React.Fragment>
      <h1>View Files</h1>
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
    </React.Fragment>
  );
};

export default ViewFiles;
