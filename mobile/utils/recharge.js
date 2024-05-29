import axios from "axios";
import { API_URL } from "@env";

export const createPayment = async (token, amount) => {
  const response = await axios.post(
    API_URL + "recharge/create_payment_url",
    {
      amount: amount,
      language: "vn",
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  // const message = response.data.paymentURL;
  // console.log(response.data.paymentURL);
  return response.data.paymentURL;
};

export const orderReview = async (token, id) => {
  const response = await axios.post(API_URL + "order-review",
    {
      post_id: id,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
