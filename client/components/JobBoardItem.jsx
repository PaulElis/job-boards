import React from "react";
import { Card } from "react-bootstrap";
import JobBoardItemStyles from "../styles/JobBoardItem.module.css";
import Link from "next/link";

const JobBoardItem = ({ jobBoard }) => {
  const { container, ratingStyle, bodyContainer, image } = JobBoardItemStyles;
  const { name, rating, logo_file, description, root_domain } = jobBoard;
  return (
    <Link
      key={name}
      href="/job_board/[id]"
      as={`/job_board/${root_domain.split(" ").join("-")}`}
    >
      <Card className={container}>
        <div className={ratingStyle}>{rating}</div>
        <div className={bodyContainer}>
          <img src={logo_file} alt="oh no!" className={image} />
          <Card.Text>{description}</Card.Text>
        </div>
      </Card>
    </Link>
  );
};

export default JobBoardItem;
