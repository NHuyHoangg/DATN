import axios from "axios";
import { API_URL } from "@env";

export const getLocation = async () => {
  const provinces = (await axios.get(API_URL + "provinces")).data;
  const districts = (await axios.get(API_URL + "districts")).data;
  const wards = (await axios.get(API_URL + "wards")).data;
  return { provinces, districts, wards };
};

export const getDropProvince = async () => {
  const response = await axios.get(API_URL + "location/province");
  const province = response?.data.slice(0, -1);
  return province;
};

export const getDropDistrict = async (province_id) => {
  const response = await axios.get(
    API_URL + `location/district/${province_id}`,
    {
      province_id,
    }
  );
  const district = response?.data;
  return district;
};

export const getDropWard = async (province_id, district_id) => {
  const response = await axios.post(API_URL + "location/districts", {
    province_id,
    district_id,
  });
  const ward = response?.data;
  return ward;
};

export const getAddress = async (token) => {
  try {
    const response = await axios.get(API_URL + "users/address", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error
    // return error.response.data;
  }
};

export const createAddress = async (info, token) => {
  try {
    const response = await axios.post(API_URL + "users/address/", info, {
      headers: {
        Authorization: token,
      },
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const changeAddress = async (token, id, info) => {
  try {
    const response = await axios.put(API_URL + `users/address/${id}`, info, {
      headers: {
        Authorization: token,
      },
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const deleteAddress = async (token, id) => {
  try {
    const response = await axios.delete(API_URL + `users/address/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};
