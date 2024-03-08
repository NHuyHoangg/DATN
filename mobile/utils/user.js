import axios from "axios";
import { API_URL } from "@env";

export const getUser = async (token) => {
  const response = await axios.get(API_URL + "user", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const changeUser = async (token, info) => {
  try {
    const response = await axios.post(API_URL + "user", info, {
      headers: {
        Authorization: token,
      },
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const getSeller = async (token) => {
  const response = await axios
    .get(API_URL + "/user-status", {
      headers: {
        Authorization: token
      }
    })
  return response.data;
};
