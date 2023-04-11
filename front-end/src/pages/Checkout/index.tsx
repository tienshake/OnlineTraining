import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../../components/PaypalCheckoutButton";
import Input from "../../components/Input";
// import Button from "../../components/Button";
import courseServices from "../../services/course";
import checkDataApi from "../../utils/checkDataApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Checkout = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [productOder, setProductOder] = useState<any>({});
  const user = useSelector((state: RootState) => state.auth.user);

  const [dataCourse, setDataCourse] = useState<any>();
  let { id } = useParams();

  useEffect(() => {
    const fetchGetCourse = async () => {
      const data = await courseServices.getCourseApi({
        id,
      });
      const result = checkDataApi(data);
      if (result) {
        const newOrderNumber = generateOrderNumber();
        setOrderNumber(newOrderNumber);
        setDataCourse(result.data);
        setProductOder({
          description: newOrderNumber,
          price: result?.data?.promotion_price,
          course_id: result?.data?.id,
          user_id: user.id,
        });
      }
    };
    fetchGetCourse();
  }, [id, user.id]);

  const generateOrderNumber = () => {
    // Tạo số ngẫu nhiên từ 1000 đến 9999
    const min = 1000;
    const max = 9999;
    const orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `ORD-${orderNumber}`;
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.contentLeft}>
        <Box className={styles.overviewSec}>
          <Box className={styles.body}>
            <h5 className={styles.subsTitle}>Payment</h5>
            <div className={styles.checkbox}>
              <input type="radio" checked /> PayPal
            </div>
            <div className={styles.code}>
              Code orders: <p>{orderNumber}</p>
            </div>
            <div className={styles.promo}>
              <Input placeholder="Enter promo code if available" />
              {/* <Button title="apply" /> */}
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <PaypalCheckoutButton
                product={productOder}
                dataCourse={dataCourse}
              />
            </div>
          </Box>
        </Box>
      </Box>
      <Box className={styles.contentRight}>
        <Box className={styles.includes}>
          <h5 className={styles.subsTitle}>Selected Plan</h5>
          <h4>NodeJS</h4>
          <div className={styles.price_content}>
            <h5 className={styles.promotion_price}>
              {dataCourse?.promotion_price}$
            </h5>
            <p className={styles.price}>{dataCourse?.price}$</p>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
