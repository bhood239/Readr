import axios from "axios";

export const createFriend = async (params) => {
  try {
    const res = await axios.post(`/api/friends`, params);
    return res.data;
  } catch (err) {
    console.log("error creating friend: ", err.message);
    return null;
  }
};

export const deleteFriend = async (params) => {
  try {
    const res = await axios.delete(`/api/friends`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("error deleting friend: ", err.message);
    return null;
  }
};
