import axios from "axios";
import { API_URL } from "@env";

export const getAds = async () => {
  const response = await axios.get(API_URL + "ads");
//   console.log(response.data)
  return response.data;
};

export const useAds = async (token, id, exp) => {
    const response = await axios.post(API_URL + "ads",
      {
        post_id: id,
        expiration_day: exp,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response)
    return response.data;
  };
