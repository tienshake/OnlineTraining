// import React, { useEffect, useState } from "react";
import styles from "./CommentViews.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import covertB64 from "../../utils/covertB64";

const CommentViews = (comments: any) => {
  const MAX_STARS = 5;
  const filledStars = Math.round(comments?.comment?.rating_value);
  const remainingStars = MAX_STARS - filledStars;

  return (
    <div className={styles.container}>
      <div className={styles.instructorWrap}>
        <div className={styles.aboutInstructor}>
          <div className={styles.abtInstructorImg}>
            <img
              src={covertB64(comments?.comment?.users.user_details.avatar)}
              alt="img"
            />
          </div>
          <div className={styles.details}>
            <h5>{comments?.comment?.users.name}</h5>
          </div>
        </div>
        <div className={styles.rating}>
          {[...Array(filledStars)].map((_, index) => (
            <AiFillStar key={index} color="gold" />
          ))}
          {[...Array(remainingStars)].map((_, index) => (
            <AiOutlineStar key={filledStars + index} color="gray" />
          ))}
          <span className={styles.averageRating}>
            {comments?.comment?.rating_value} Rating
          </span>
        </div>
      </div>
      <div className={styles.commentContent}>{comments?.comment.comment}</div>
    </div>
  );
};

export default CommentViews;
