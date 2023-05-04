import React, { useEffect, useState } from "react";
import DefaultLayoutEdit from "../DefaultayoutEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import styles from "./Order.module.scss";
import paymentServices from "../../services/payment";
import checkDataApi from "../../utils/checkDataApi";
import moment from "moment";
import LoadingModal from "../LoadingModal";

const Order = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userRedux = useSelector((state: RootState) => state.auth.user);
  const [dataPayment, setDataPayment] = useState([]);

  useEffect(() => {
    const getPaymentData = async () => {
      setIsLoading(true);
      const data = await paymentServices.getPayment(userRedux.id);
      const result = checkDataApi(data);
      if (result) {
        setDataPayment(result.data);
        setIsLoading(false);
      }
    };
    getPaymentData();
  }, [userRedux]);

  return (
    <DefaultLayoutEdit
      titleHeader="Order"
      textHeader="Order Dashboard is a quick overview of all current orders."
    >
      <LoadingModal isLoading={isLoading} />
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>COURSE</th>
              <th>AMOUNT</th>
              <th>NAME USER</th>
              <th>DATE</th>
              <th>METHOD</th>
            </tr>
          </thead>
          <tbody>
            {dataPayment &&
              dataPayment.length > 0 &&
              dataPayment.map((item: any) => (
                <tr key={item.id}>
                  <td>{item?.Course?.title}</td>
                  <td>
                    {item?.amount} {item?.currency_code}
                  </td>
                  <td>{item?.User.name}</td>
                  <td>
                    {item?.createdAt &&
                      moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>Paypal</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DefaultLayoutEdit>
  );
};

export default Order;
