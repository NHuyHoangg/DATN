/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://dho.hcmut.tech/';

export const searchWatch = async (page) => {
  const response = await axios.get(API_URL + 'search?page=' + page);
  const data = response.data.entries;
  const currPage = response.data.currentPage;
  const totalPage = response.data.totalPages;
  return { data, currPage, totalPage };
};

export const fetchWatchDetails = async (id) => {
  const response = await axios.post(
    API_URL + "posts",
    { post_id: id },
  );
  return response.data;
};