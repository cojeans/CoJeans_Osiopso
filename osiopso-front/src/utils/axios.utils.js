import axios from "axios";

export const createClosetAxios = (closetName, isSelected) => {
  const Token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1NjcxMTYxLCJleHAiOjE2NzY1MzUxNjF9.UMgCmCjvJup8nIxsw9s7qwgpp5h8pZJPbYdeate1jwwJ4PXxbDmD5WTlmE_OOnIfWI0UMEKHnyTsUND9gGEiyg`;
  axios({
    method: "post",
    url: "http://localhost:8080/closet",
    data: {
      name: closetName,
      isSelected: isSelected,
    },
    headers: {
      Authorization: `Bearer ${Token}`,
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
