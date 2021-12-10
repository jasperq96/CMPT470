import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { capitalize } from '../utils/capitalizeString';

const FileElement = (props) => {
  const [file, setFile] = useState('');

  const getFile = async () => {
    const url = `/file/${props.data.id}`;
    try {
      await httpService
        .get(url, {
          responseType: 'blob'
        })
        .then((response) => {
          setFile(URL.createObjectURL(response.data));
        });
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <React.Fragment>
      <tr>
        <td>
          <a href={file} download={`${props.data.filename}`}>
            {props.data.filename}
          </a>
        </td>
        <td>{props.data.mimetype}</td>
        <td>{props.data.size}</td>
      </tr>
    </React.Fragment>
  );
};

export default FileElement;
