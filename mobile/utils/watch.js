import axios from "axios";
import { API_URL } from "@env";

const baseURL = API_URL;

export const fetchWatchPosts = async (token, filterProps) => {
  let url = baseURL + "posts?";
  let { brand, condition, engine, price, size, sortOrder } = filterProps;
  brand = brand
    .map((str) => str)
    .reduce((acc, current) => acc + "brand=" + current + "&&", "");
  url += brand.slice(0, brand.length - 2);
  if (condition) url += "&&condition=" + condition;
  if (price) url += "&&priceRange=" + price;
  if (size) url += "&&size=" + size;
  if (sortOrder) url += "&&sortBy=" + sortOrder;
  const response = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const searchWatch = async (name) => {
  const response = await axios.get(baseURL + "search?q=" + name);
  // console.log("dfnksjdf")
  return response.data;
};

export const fetchWatchDetails = async (token, id) => {
  const response = await axios.post(
    baseURL + "posts",
    { post_id: id },
    {
      headers: {
        Authorization: !!token ? token : "",
      },
    }
  );
  return response.data;
};

export const fetchSellingPost = async (token) => {
  const response = await axios.post(
    baseURL + "posts/history",
    {
      status: 0,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const fetchSoldPost = async (token) => {
  const response = await axios.post(
    baseURL + "posts/history",
    {
      status: 1,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const sendNewPost = async (token, data) => {
  const response = await axios
    .post(baseURL + "posts/upload", data, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => console.log("Send OK!"))
    .catch((err) => console.log(err));
};
export const editPost = async (token, data) => {
  const response = await axios
    .post(baseURL + "posts/edit", data, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => console.log("Edit OK!"))
    .catch((err) => console.log(err));
};
export const deletePost = async (token, postId) => {
  const response = await axios
    .delete(`${baseURL}/posts/${postId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => console.log("Delete OK!"))
    .catch((err) => console.log(err));
};

export const addPostToFavorite = async (token, id) => {
  const reponse = await axios
    .post(
      `${baseURL}/favorite_post`,
      {
        post_id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((data) => console.log("Add post to favorite OK!"))
    .catch((err) => console.log(err));
};

export const deletePostFromFavorite = async (token, id) => {
  const response = await axios
    .delete(`${baseURL}/favorite_post/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => console.log("Delete post from favorite OK!"))
    .catch((err) => console.log(err));
};

export const toggePostState = async (token, id) => {
  const response = await axios
    .post(
      baseURL + "/posts/toggle",
      {
        postId: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((data) => console.log("Toggle OK!"))
    .catch((err) => console.log(err));
};

export const saveWatchInformation = async (token, id) => {
  const response = axios
    .post(
      baseURL + "/favorite_watch",
      {
        watch_id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((data) => console.log("Save watch infor OK!"))
    .catch((err) => console.log(err));
};

export const getFavoriteWatch = async (token) => {
  const response = await axios.get(baseURL + "/favorite_watch", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const deleteFavoriteWatch = async (token, watch_id) => {
  const response = await axios
    .delete(baseURL + `/favorite_watch/${watch_id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => console.log("delete favorite product OK!"))
    .catch((err) => console.log(err));
};

export const getFavoriteWatchPost = async (id) => {
  const response = await axios.post(baseURL + "/favorite_watch_post", {
    watch_id: id,
  });
  return response.data;
};
