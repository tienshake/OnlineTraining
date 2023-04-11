import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import paymentServices from "../../services/payment";
import checkDataApi from "../../utils/checkDataApi";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import covertB64 from "../../utils/covertB64";

const PaypalCheckoutButton = (props: any) => {
  const { product, dataCourse } = props;
  const navigate = useNavigate();

  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onClick={async (data, actions) => {
        const dataAPI = await paymentServices.checkPayment({
          course_id: product?.course_id,
          user_id: +product?.user_id,
        });
        const result = checkDataApi(dataAPI);
        if (result) {
          return actions.resolve();
        } else {
          toast.error(
            "You already bought this course. Go to your account to view your list of courses."
          );
          return actions.reject();
        }
      }}
      onApprove={async (data, actions: any) => {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
          console.log(order);
          const dataAPI = await paymentServices.createPayment({
            course_id: product?.course_id,
            user_id: +product?.user_id,
            amount: order?.purchase_units[0].amount.value,
            status: order.status,
            order_id: order.id,
            email_address: order?.payer.email_address,
            nameOder: order?.payer.name.surname + order?.payer.name.given_name,
            currency_code: order?.purchase_units[0].amount.currency_code,
            create_time: order.create_time,
          });
          const result = checkDataApi(dataAPI);
          if (result) {
            navigate("/bill", {
              state: {
                ...result.data,
                price: dataCourse.price,
                title: dataCourse.title,
                thumbnail: covertB64(dataCourse.thumbnail),
              },
            });
            // <Navigate to="/bill" />;
            toast.success("Payment successful");
          } else {
            toast.error("Payment failed");
          }
        }
      }}
      onError={(err: any) => {
        toast.error(err);
        console.error("PayPal Checkout onError", err);
      }}
      // onCancel={() => {
      //   // Display cancel message, modal or redirect user to cancel page or back to cart
      // }}
    />
  );
};

export default PaypalCheckoutButton;

// sb-dtyhr25490522@personal.example.com
// 2u!h/=V!
