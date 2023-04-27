import { PayPalButtons } from "@paypal/react-paypal-js";
import paymentServices from "../../services/payment";
import checkDataApi from "../../utils/checkDataApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import covertB64 from "../../utils/covertB64";
import { useDispatch } from "react-redux";
import { removeCart } from "../../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import courseServices from "../../services/course";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const PaypalCheckoutButton = (props: any) => {
  const đispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loadedProduct, setLoadedProduct] = useState<any>(null);

  useEffect(() => {
    const getCourseData = async () => {
      const data = await courseServices.getCourseApi({
        id,
      });
      const result = checkDataApi(data);
      if (result) {
        setLoadedProduct(result.data);
      }
    };
    getCourseData();
  }, []);

  if (!loadedProduct) {
    return <div>Loading...</div>;
  }

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
              description: "ORD-6431",
              amount: {
                value: loadedProduct.promotion_price,
              },
            },
          ],
        });
      }}
      onClick={async (data, actions) => {
        if (loadedProduct) {
          đispatch(removeCart(props.product.course_id));

          const dataAPI = await paymentServices.checkPayment({
            course_id: loadedProduct?.id,
            user_id: +loadedProduct?.user.id,
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
        }
      }}
      onApprove={async (data, actions: any) => {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
          console.log(order);
          const dataAPI = await paymentServices.createPayment({
            create_user_id: loadedProduct?.user.id,
            course_id: loadedProduct?.id,
            user_id: user?.id,
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
                price: loadedProduct.price,
                title: loadedProduct.title,
                thumbnail: covertB64(loadedProduct.thumbnail),
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
