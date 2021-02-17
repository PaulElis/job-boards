import React from "react";
import { Card } from "react-bootstrap";
import JobBoardItemStyles from "../styles/JobBoardItem.module.css";

const JobBoardItem = ({ jobBoard }) => {
  const { rating, logo_file, description } = jobBoard;
  return (
    <div>
      <Card className={JobBoardItemStyles.cardContainer}>
        <div className={JobBoardItemStyles.cardRating}>{rating}</div>
        <div className={JobBoardItemStyles.cardBodyContainer}>
          <img
            src={logo_file}
            alt="oh no!"
            className={JobBoardItemStyles.cardImage}
          />
          <Card.Text>{description}</Card.Text>
        </div>
      </Card>
    </div>
  );
};

export default JobBoardItem;
