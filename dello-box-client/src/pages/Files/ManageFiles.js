import '../../App.css';
import React, { useContext, useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import { UserContext } from '../../hooks/UserContext';
import { editFileObject } from '../../models/fileModel';
import { capitalize } from '../../utils/capitalizeString';
import ManageFileElement from '../../components/ManageFile';

const ManageFiles = () => {
  const userContext = useContext(UserContext);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const url = `/file-list/${userContext.user?.id}/private`;
    try {
      const response = await httpService.get(url);
      setFiles(response.data);
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const editFile = async (fileId, visibilityStatusObject) => {
    const url = `/file/${fileId}`;
    try {
      await httpService.put(url, visibilityStatusObject);
      toast.success('Successfully changed the visibility!');
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const deleteFile = async (fileId) => {
    const url = `/file/${fileId}`;
    try {
      await httpService.del(url);
      toast.success('Successfully deleted file!');
    } catch (error) {
      toast.error('Error: '.concat(capitalize(error.response.data.error)));
    }
  };

  const handleVisibility = (fileId, visibilityStatus) => {
    try {
      const updatedFiles = [...files];
      const editFileWithId = files.findIndex((file) => file.id === fileId);
      editFile(fileId, editFileObject(!visibilityStatus));
      updatedFiles[editFileWithId].is_public = !visibilityStatus;
      setFiles(updatedFiles);
    } catch (error) {
      toast.error('Error: Visibility of the file cannot be changed');
    }
  };

  const handleDelete = (fileId) => {
    try {
      const updatedFiles = [...files];
      const deleteFileWithId = files.findIndex((file) => file.id === fileId);
      deleteFile(fileId);
      updatedFiles.splice(deleteFileWithId, 1);
      setFiles(updatedFiles);
    } catch (error) {
      toast.error('Error: File cannot be deleted');
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <React.Fragment>
      <h1>Manage Files</h1>
      <div className="file-container">
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Date Created</th>
              <th>Mimetype</th>
              <th>Size (Bytes)</th>
              <th>Actions</th>
            </tr>
          </thead>
          {files.map((file, index) => (
            <ManageFileElement id={index} data={file} handleVisibility={handleVisibility} handleDelete={handleDelete} />
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default ManageFiles;
