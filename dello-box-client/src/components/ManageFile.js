import React from 'react';
import { Button } from 'react-bootstrap';
import '../stylesheets/files.css';
const ManageFileElement = ({ data, handleVisibility, handleDelete }) => {
  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>{data.filename}</td>
          <td className="responsive-cut">{data.created_at.slice(0, 10)}</td>
          <td className="responsive-cut-700">{data.mimetype}</td>
          <td className="responsive-cut">{data.size}</td>
          <td>
            <Button className="file-button-margin" variant="outline-light" type="button" onClick={() => handleVisibility(data.id, data.is_public)}>
              Set {data.is_public ? 'Private' : 'Public'}
            </Button>
            <Button className="file-button-margin" variant="outline-danger" type="button" onClick={() => handleDelete(data.id)}>
              Delete File
            </Button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default ManageFileElement;
