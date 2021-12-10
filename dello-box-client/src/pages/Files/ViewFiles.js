import React, { useContext, useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { capitalize } from '../../utils/capitalizeString';
import FileElement from '../../components/File';

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
      <table>
        <tr>
          <th>Filename</th>
          <th>Mimetype</th>
          <th>Size (Bytes)</th>
        </tr>
        {files.map((file, index) => (
          <FileElement data={file} />
        ))}
      </table>
    </React.Fragment>
  );
};

export default ViewFiles;
