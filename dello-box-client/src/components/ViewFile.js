import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { capitalize } from '../utils/capitalizeString';

const ViewFileElement = ({ fileData }) => {
  const [file, setFile] = useState('');

  const getFile = async () => {
    const url = `/file/${fileData.id}`;
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
      <tbody>
        <tr>
          <td>
            <a href={file} download={`${fileData.filename}`}>
              {fileData.filename}
            </a>
          </td>
          <td className="responsive-cut">{fileData.created_at}</td>
          <td>{fileData.mimetype}</td>
          <td className="responsive-cut">{fileData.size}</td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default ViewFileElement;
