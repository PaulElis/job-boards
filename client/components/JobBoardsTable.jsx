import { green } from "colors";
import React from "react";
import { Table } from "react-bootstrap";
import JobBoardsTableStyles from "../styles/JobBoardsTable.module.css";

const JobBoardsTable = ({ foundJobBoard }) => {
  const { title, row, cell } = JobBoardsTableStyles;
  const { data } = foundJobBoard;

  const renderRows = data.map((job, index) => {
    const { primary_key, company_name, job_title, job_url } = job;
    return (
      <tr key={index} className={row}>
        <td>{primary_key}</td>
        <td>{company_name}</td>
        <td>{job_title}</td>
        <td>{job_url}</td>
      </tr>
    );
  });
  console.log("foundJobBoard: ", foundJobBoard);
  return (
    <>
      <div className={title}>Job Source: {}</div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Job URL</th>
          </tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </Table>
    </>
  );
};

export default JobBoardsTable;
