import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import JobBoardsTable from "../../../components/JobBoardsTable";
import JobBoardIndexStyles from "../../../styles/JobBoardIndex.module.css";

const index = props => {
  const router = useRouter();
  const { loading } = JobBoardIndexStyles;
  const [isLoading, setLoading] = useState(true);
  const [jobBoards, setJobBoards] = useState([]);

  const getResolvedJobBoards = async () => {
    const jobBoards = await axios.get("http://localhost:5000/job-boards");
    setJobBoards(jobBoards.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getResolvedJobBoards();
  }, []);

  if (isLoading) {
    return <div className={loading}>Loading...</div>;
  }

  const foundJobBoard = jobBoards.find(jobBoard => {
    return jobBoard.domain === router.query.id;
  });

  console.log("props: ", props);
  console.log("router.query.id: ", router.query.id);
  console.log("jobBoards: ", jobBoards);

  return (
    <div>
      <JobBoardsTable foundJobBoard={foundJobBoard} />
    </div>
  );
};

export default index;
