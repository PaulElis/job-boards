import React from "react";

const JobBoardsTable = () => {
  return (
    <>
      <div>Job Source: {}</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Job URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default JobBoardsTable;
