/* eslint-disable */
import axios from 'axios';

const API_URL = 'https://dho.hcmut.tech/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAwMTQiLCJpYXQiOjE3MTYzNzU4MjZ9.2cuBjhiSnoqxE1JhteyKVpxnHiqm60nDRPkgPPVNx_w';

export const getUser = async () => {
  try {
    const response = await axios.get(API_URL + 'admin/users', {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (info) => {
  try {
    const response = await axios.post(API_URL + 'admin/users-create', info, {
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

export const changeUser = async (info) => {
  try {
    const response = await axios.post(API_URL + 'admin/users-edit', info, {
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

export const blockUser = async (id) => {
  try {
    const response = await axios.post(API_URL + 'admin/users-block',
    {
      id: id,
    } , {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    throw error;
  }
};
