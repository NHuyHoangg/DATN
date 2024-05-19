/* eslint-disable */
import axios from 'axios';

const API_URL = 'https://dho.hcmut.tech/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAwMDQiLCJpYXQiOjE3MTYwMzI3NDd9.fSAuo5-4_OUpn1roA_qEWe3NzJivmZR8IPiBi91D2Kc';

export const getAd = async () => {
  const response = await axios.get(API_URL + 'ads');
  return response.data;
};

export const createAd = async (info) => {
  try {
    const response = await axios.post(API_URL + 'admin/service-create', info, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const changeAd = async (info) => {
  try {
    const response = await axios.post(API_URL + 'admin/service-edit', info, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};
