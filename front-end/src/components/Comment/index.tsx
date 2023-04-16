import React, { useState } from "react";
import styles from "./Comment.module.scss";
import Input from "../Input";
import { Rating } from "react-simple-star-rating";
import Button from "../Button";
import ratingServices from "../../services/rating";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
// import checkDataApi from "../../utils/checkDataApi";

const Comment = ({ getRatingData }: any) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  let { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handelCreateRating = async () => {
    const data: any = await ratingServices.createRatingApi({
      user_id: user.id,
      comment,
      course_id: id,
      rating_value: rating,
    });
    toast.success(data?.data.message);
    getRatingData();
  };

  const handleSubmitComment = () => {
    if (!comment) {
      toast.warning("not comment");
    } else {
      confirmAlert({
        title: "Confirm deletion",
        message: "Comment now?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              handelCreateRating();
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  return (
    <div className={styles.container}>
      <h4>Post A comment</h4>
      <div className={styles.form}>
        <Input
          placeholder="comment "
          multiline
          rows={4}
          value={comment}
          onChange={(e: any) => setComment(e.target.value)}
        />
        {/* <Input placeholder="email" /> */}
      </div>
      <div className={styles.rating}>
        <span>Rating: </span>
        <div className={styles.star}>
          <Rating onClick={handleRating} initialValue={1} />
        </div>
      </div>
      <Button title="submit" onClick={handleSubmitComment} />
    </div>
  );
};

export default Comment;
