import React, { useEffect, useState } from "react";
import axios from "axios";
import JobBoardItem from "./JobBoardItem";
import JobBoardsList from "../../data/jobBoards.json";
import JobBoardsStyles from "../styles/JobBoards.module.css";

const JobBoards = () => {
  const { title, container, loading } = JobBoardsStyles;

  const renderJobBoards = JobBoardsList.map((jobBoard, index) => {
    return <JobBoardItem jobBoard={jobBoard} key={index} />;
  });

  return (
    <>
      <div className={title}>Job Boards</div>
      <div className={container}>{renderJobBoards}</div>
    </>
  );
};

export default JobBoards;
