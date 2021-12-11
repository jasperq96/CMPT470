import React from 'react';

const ManageFileElement = ({ data, handleVisibility, handleDelete }) => {
  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>{data.filename}</td>
          <td>{data.created_at}</td>
          <td>{data.mimetype}</td>
          <td>{data.size}</td>
          <td>
            <button type="button" onClick={() => handleVisibility(data.id, data.is_public)}>
              Set {data.is_public ? 'Private' : 'Public'}
            </button>
            <button type="button" onClick={() => handleDelete(data.id)}>
              Delete File
            </button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default ManageFileElement;
