import axios from "axios";

const Token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1NjcxNTQ1LCJleHAiOjE2NzY1MzU1NDV9.jgmCKjiFNLorIuPM7J9sqk4k9_5G6oRGRcQqpGQsdcHSRZwniovjVu7P8McagBnE4EPwaBZ1E_mzDP1EULMZ3w`;

export const createClosetAxios = (closetName, isSelected) => {
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


export const postClothesAxios = () => {
  axios({
    method: "post",
    url: "http://localhost:8080/closet/clothes",
    data: {
      category: "Top",
      originFilename: "originFilename",
      storeFilename: "storeFilename",
      closets: [
        {
          id: 1,
          name: "",
          isSelected: false,
        },
      ],
      colors: [
        { id: 1, colorName: "RED" },
        { id: 3, colorName: "BLACK" },
      ],
      seasons: [
        { id: 1, seasonName: "Spring" },
        { id: 4, seasonName: "Winter" },
      ],
      tags: [
        { dtype: "S", id: 1, keyword: "Modern" },
        { dtype: "T", id: 3, keyword: "Wedding" },
      ],
    },
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
}