import React, { useEffect, useState } from "react";
import axios from "axios";
import JobBoardItem from "./JobBoardItem";
import JobBoardsList from "../../jobBoards.json";
import JobBoardsStyles from "../styles/JobBoards.module.css";

const JobBoards = () => {
  const { title, container, loading } = JobBoardsStyles;
  const [isLoading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);

  const getOpportunities = async () => {
    const opportunities = await axios.get(
      "http://localhost:5000/opportunities"
    );
    setOpportunities(opportunities.data.data);
    setLoading(false);
    console.log("opportunities: ", opportunities);
  };

  useEffect(() => {
    getOpportunities();
  }, []);

  if (isLoading) {
    return <div className={loading}>Loading...</div>;
  }

  const renderJobBoards = JobBoardsList.map((jobBoard, index) => {
    return (
      <JobBoardItem
        jobBoard={jobBoard}
        key={index}
        opportunities={opportunities}
      />
    );
  });

  return (
    <>
      <div className={title}>Job Boards</div>
      <div className={container}>{renderJobBoards}</div>
    </>
  );
};

export default JobBoards;
