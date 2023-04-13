import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./BillOder.module.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import moment from "moment";
import { ButtonNext } from "../../components/Button";

const BillOder = () => {
  const location = useLocation();
  const data = location.state;
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("dataCourse", data);

  return (
    <div className={styles.container}>
      <div className={styles.iconText}>
        <TaskAltIcon className={styles.iconTask} />
        <h1 className={styles.titleIcon}>Payment Received</h1>
      </div>
      <div className={styles.content}>
        <h1>Hi [{user.name}]</h1>
        <h2> You transaction was successful!</h2>
        <div className={styles.course}>
          <p>Title: {data.title} </p>
          <img src={data.thumbnail} alt="thumbnail" />
        </div>
        <h1>Payment Details:</h1>
        <p>Email address: {data.email_address} </p>
        <p style={{ textDecoration: "line-through" }}>
          Price: {data.price} {data.currency_code}
        </p>
        <p>
          Price promotion: {data.amount} {data.currency_code}
        </p>
        <p>Status: {data.status}</p>
        <p>Name oder: {data.nameOder}</p>
        <p>
          Create time:{" "}
          {data.create_time && moment(data.create_time).format("DD/MM/YYYY")}
        </p>
        <div className={styles.control}>
          <ButtonNext title="Learn now" path={`/learning/${data.course_id}`} />
        </div>
      </div>
    </div>
  );
};

export default BillOder;
