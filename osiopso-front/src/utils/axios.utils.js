import axios from "axios";

export const createClosetAxios = (closetName, isSelected, email) => {
  axios({
    method: "post",
    url: "http://localhost:8080/closet",
    data: {
      closetName,
      email,
      isSelected,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClosetAxios = (email) => {
  axios({
    method: "post",
    url: "http://localhost:8080/closet/list",
    data: {
      email,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
